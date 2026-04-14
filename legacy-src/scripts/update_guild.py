from __future__ import annotations

import os
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import quote, urlparse

import requests
import yaml

# ------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------
GUILD_API_URL = "https://raider.io/api/v1/guilds/profile"
CHAR_API_URL = "https://raider.io/api/v1/characters/profile"
BLIZZARD_TOKEN_URL = "https://oauth.battle.net/token"
BLIZZARD_API_BASE = "https://{region}.api.blizzard.com"

HEADERS = {"accept": "application/json"}

GUILD_PARAMS = {
    "access_key": os.getenv("RAIDERIO_ACCESS_KEY", "RIOJGDTBvmXP1GcEYRDhBZSzf"),
    "region": os.getenv("WOW_REGION", "eu"),
    "realm": os.getenv("WOW_REALM", "terokkar"),
    "name": os.getenv("WOW_GUILD_NAME", "Mistblossom Vanguard"),
    "fields": "raid_progression:current-expansion:previous-expansion,"
              "raid_rankings:current-expansion:previous-expansion,members",
}

BLIZZARD_CLIENT_ID = os.getenv("BLIZZARD_CLIENT_ID", "")
BLIZZARD_CLIENT_SECRET = os.getenv("BLIZZARD_CLIENT_SECRET", "")
BLIZZARD_LOCALE = os.getenv("BLIZZARD_LOCALE", "en_US")
REQUEST_DELAY_SECONDS = float(os.getenv("REQUEST_DELAY_SECONDS", "0.12"))
OUTPUT_GUILD_FILE = Path(os.getenv("OUTPUT_GUILD_FILE", "_data/guild.yml"))
OUTPUT_PROFESSIONS_FILE = Path(os.getenv("OUTPUT_PROFESSIONS_FILE", "_data/professions.yml"))


@dataclass
class ApiContext:
    session: requests.Session
    blizzard_token: Optional[str] = None


# ------------------------------------------------------------
# HTTP / HELPERS
# ------------------------------------------------------------
def build_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(HEADERS)
    return session


def safe_get(session: requests.Session, url: str, **kwargs: Any) -> Optional[requests.Response]:
    try:
        response = session.get(url, timeout=20, **kwargs)
        return response
    except requests.RequestException as exc:
        print(f"❌ Request error for {url}: {exc}")
        return None


def profile_url_to_realm_slug(profile_url: Optional[str], fallback_realm: str) -> str:
    """Extract realm slug from Raider.IO profile URL, fallback to a simple slug."""
    if profile_url:
        try:
            path_parts = [part for part in urlparse(profile_url).path.split("/") if part]
            # Expected: /characters/{region}/{realm-slug}/{name}
            if len(path_parts) >= 4:
                return path_parts[2]
        except Exception:
            pass

    slug = fallback_realm.strip().lower()
    slug = slug.replace("'", "")
    for char in [" ", "_", "."]:
        slug = slug.replace(char, "-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def encode_character_name(name: str) -> str:
    return quote(name.lower(), safe="")


def ensure_parent_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def round_item_level(value: Any) -> int:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return 0
    if numeric <= 0:
        return 0
    return int(numeric + 0.5)


# ------------------------------------------------------------
# RAIDER.IO
# ------------------------------------------------------------
def fetch_guild_data(ctx: ApiContext) -> Optional[Dict[str, Any]]:
    print(f"🏰 Fetching guild data for {GUILD_PARAMS['name']}...")
    response = safe_get(ctx.session, GUILD_API_URL, params=GUILD_PARAMS)
    if not response:
        return None

    if response.status_code == 200:
        return response.json()

    print(f"❌ Guild API Error: {response.status_code} - {response.text}")
    return None


def fetch_character_details(ctx: ApiContext, region: str, realm: str, name: str) -> Optional[Dict[str, Any]]:
    params = {
        "region": region,
        "realm": realm,
        "name": name,
        "fields": "mythic_plus_scores_by_season:current,gear",
    }

    response = safe_get(ctx.session, CHAR_API_URL, params=params)
    if not response:
        return None

    if response.status_code != 200:
        print(f"   ⚠️ Char API Error for {name}: {response.status_code}")
        return None

    data = response.json()
    thumbnail = data.get("thumbnail_url")

    mp_data = {}

    seasons = data.get("mythic_plus_scores_by_season", [])
    if seasons:
        current_season = seasons[0]
        segments = current_season.get("segments", {})
    for segment_name, segment_data in segments.items():
        mp_data[segment_name] = {
            "score": segment_data.get("score", 0),
            "color": segment_data.get("color", "#ffffff"),
        }

    return {
        "thumbnail_url": thumbnail,
        "mythic_plus_scores": mp_data,
        "item_level_equipped": round_item_level(data.get("gear", {}).get("item_level_equipped")),
    }


# ------------------------------------------------------------
# BLIZZARD API
# ------------------------------------------------------------
def fetch_blizzard_access_token(ctx: ApiContext) -> Optional[str]:
    if ctx.blizzard_token:
        return ctx.blizzard_token

    if not BLIZZARD_CLIENT_ID or not BLIZZARD_CLIENT_SECRET:
        print("⚠️ Blizzard client credentials are missing. Professions will be skipped.")
        return None

    try:
        response = requests.post(
            BLIZZARD_TOKEN_URL,
            auth=(BLIZZARD_CLIENT_ID, BLIZZARD_CLIENT_SECRET),
            data={"grant_type": "client_credentials"},
            timeout=20,
        )
    except requests.RequestException as exc:
        print(f"❌ Blizzard OAuth error: {exc}")
        return None

    if response.status_code != 200:
        print(f"❌ Blizzard OAuth failed: {response.status_code} - {response.text}")
        return None

    payload = response.json()
    token = payload.get("access_token")
    if not token:
        print("❌ Blizzard OAuth response does not contain access_token.")
        return None

    ctx.blizzard_token = token
    return token


def extract_profession_groups(payload: Dict[str, Any]) -> Dict[str, List[Dict[str, Any]]]:
    result: Dict[str, List[Dict[str, Any]]] = {
        "primaries": [],
        "secondaries": [],
    }

    for group_name in ["primaries", "secondaries"]:
        for entry in payload.get(group_name, []) or []:
            profession = entry.get("profession", {})
            tiers = []
            for tier_entry in entry.get("tiers", []) or []:
                tier = tier_entry.get("tier", {})
                tiers.append(
                    {
                        "name": tier.get("name"),
                        "learned_points": tier_entry.get("skill_points", 0),
                        "max_points": tier_entry.get("max_skill_points", 0),
                    }
                )

            result[group_name].append(
                {
                    "name": profession.get("name"),
                    "id": profession.get("id"),
                    "tiers": tiers,
                }
            )

    return result


def fetch_character_professions(
    ctx: ApiContext,
    region: str,
    realm_slug: str,
    character_name: str,
) -> Dict[str, List[Dict[str, Any]]]:
    token = fetch_blizzard_access_token(ctx)
    if not token:
        return {"primaries": [], "secondaries": []}

    encoded_name = encode_character_name(character_name)
    url = (
        BLIZZARD_API_BASE.format(region=region)
        + f"/profile/wow/character/{realm_slug}/{encoded_name}/professions"
    )
    params = {
        "namespace": f"profile-{region}",
        "locale": BLIZZARD_LOCALE,
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=20)
    except requests.RequestException as exc:
        print(f"   ⚠️ Professions request failed for {character_name}: {exc}")
        return {"primaries": [], "secondaries": []}

    if response.status_code == 200:
        return extract_profession_groups(response.json())

    if response.status_code == 404:
        print(f"   ⚠️ Professions not found for {character_name} ({realm_slug}).")
    else:
        print(f"   ⚠️ Professions API Error for {character_name}: {response.status_code}")
    return {"primaries": [], "secondaries": []}


# ------------------------------------------------------------
# BUILD OUTPUT
# ------------------------------------------------------------
def build_guild_and_professions_data() -> tuple[Optional[Dict[str, Any]], Optional[Dict[str, Any]]]:
    ctx = ApiContext(session=build_session())
    guild_data = fetch_guild_data(ctx)
    if not guild_data:
        return None, None

    processed_members: List[Dict[str, Any]] = []
    professions_characters: List[Dict[str, Any]] = []

    members = guild_data.get("members", [])
    total_members = len(members)
    print(f"👥 Found {total_members} members. Starting detailed scan...")

    for index, member in enumerate(members, start=1):
        char_basic = member["character"]
        name = char_basic["name"]
        realm = char_basic.get("realm", GUILD_PARAMS["realm"])
        region = char_basic.get("region", GUILD_PARAMS["region"])
        profile_url = char_basic.get("profile_url")
        realm_slug = profile_url_to_realm_slug(profile_url, realm)

        print(f"   [{index}/{total_members}] Processing {name}...")

        details = fetch_character_details(ctx, region, realm, name)
        professions = fetch_character_professions(ctx, region, realm_slug, name)

        char_thumbnail = char_basic.get("thumbnail_url")
        mp_scores = {}
        item_level_equipped = 0
        if details:
            if details.get("thumbnail_url"):
                char_thumbnail = details["thumbnail_url"]
            mp_scores = details["mythic_plus_scores"]
            item_level_equipped = details.get("item_level_equipped", 0)

        member_data = {
            "rank": member["rank"],
            "name": name,
            "class": char_basic["class"],
            "race": char_basic["race"],
            "spec": char_basic.get("active_spec_name"),
            "role": char_basic.get("active_spec_role"),
            "gender": char_basic.get("gender"),
            "faction": char_basic.get("faction"),
            "region": region,
            "realm": realm,
            "realm_slug": realm_slug,
            "profile_url": profile_url,
            "avatar": char_thumbnail,
            "mythic_plus_scores": mp_scores,
            "item_level_equipped": item_level_equipped,
        }
        processed_members.append(member_data)

        professions_characters.append(
            {
                "name": name,
                "region": region,
                "realm": realm,
                "realm_slug": realm_slug,
                "profile_url": profile_url,
                "professions": professions,
            }
        )

        time.sleep(REQUEST_DELAY_SECONDS)

    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    guild_output = {
        "metadata": {
            "updated_at": timestamp,
            "source": "Raider.IO API + Blizzard Professions API",
        },
        "guild_info": {
            "name": guild_data.get("name"),
            "faction": guild_data.get("faction"),
            "realm": guild_data.get("realm"),
            "region": guild_data.get("region"),
            "profile_url": guild_data.get("profile_url"),
        },
        "raid_progression": guild_data.get("raid_progression", {}),
        "raid_rankings": guild_data.get("raid_rankings", {}),
        "members": processed_members,
    }

    professions_output = {
        "metadata": {
            "updated_at": timestamp,
            "source": "Blizzard Character Professions Summary API",
        },
        "guild": {
            "name": guild_data.get("name"),
            "realm": guild_data.get("realm"),
            "region": guild_data.get("region"),
        },
        "characters": professions_characters,
    }

    return guild_output, professions_output


def write_yaml(path: Path, payload: Dict[str, Any]) -> None:
    ensure_parent_dir(path)
    with path.open("w", encoding="utf-8") as file:
        yaml.dump(payload, file, allow_unicode=True, sort_keys=False, width=120)
    print(f"✅ Data successfully saved to {path}")


def main() -> int:
    guild_output, professions_output = build_guild_and_professions_data()
    if not guild_output or not professions_output:
        print("❌ Failed to build guild/professions data.")
        return 1

    try:
        write_yaml(OUTPUT_GUILD_FILE, guild_output)
        write_yaml(OUTPUT_PROFESSIONS_FILE, professions_output)
    except OSError as exc:
        print(f"❌ File write error: {exc}")
        return 1

    print("🎉 Finished building guild roster + professions database.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
