import requests
import yaml
import time

API_URL = "https://raider.io/api/v1/characters/profile"
FIELDS = "guild,mythic_plus_scores_by_season:current"

DELAY = 2            # пауза між запитами (сек)
MAX_RETRIES = 3      # скільки разів пробувати при 429

characters = [
    {"region": "eu", "realm": "terokkar", "name": "khayen"},
    {"region": "eu", "realm": "terokkar", "name": "krouli"},
    {"region": "eu", "realm": "terokkar", "name": "sebas"}
]

def fetch_character(char):
    params = {
        "region": char["region"],
        "realm": char["realm"],
        "name": char["name"],
        "fields": FIELDS
    }

    for attempt in range(1, MAX_RETRIES + 1):
        r = requests.get(API_URL, params=params, timeout=15)

        if r.status_code == 200:
            return r.json()

        if r.status_code == 429:
            wait = attempt * 5
            print(f"⚠️ Rate limit for {char['name']}. Retry in {wait}s...")
            time.sleep(wait)
            continue

        print(f"❌ Failed {char['name']} — HTTP {r.status_code}")
        return None

    print(f"❌ Rate limit exceeded for {char['name']}")
    return None


output = []

for char in characters:
    data = fetch_character(char)
    if not data:
        continue

    season = data.get("mythic_plus_scores_by_season", [{}])[0]
    scores = season.get("scores", {})
    segments = season.get("segments", {})

    char_data = {
        "name": data.get("name"),
        "race": data.get("race"),
        "class": data.get("class"),
        "region": data.get("region"),
        "realm": data.get("realm"),
        "avatar": data.get("thumbnail_url"),
        "link": data.get("profile_url"),
        "guild": {
            "name": data.get("guild", {}).get("name"),
            "realm": data.get("guild", {}).get("realm")
        },
        "dps": {
            "score": scores.get("dps", 0),
            "color": segments.get("dps", {}).get("color", "#ffffff")
        },
        "healer": {
            "score": scores.get("healer", 0),
            "color": segments.get("healer", {}).get("color", "#ffffff")
        },
        "tank": {
            "score": scores.get("tank", 0),
            "color": segments.get("tank", {}).get("color", "#ffffff")
        }
    }

    output.append(char_data)
    time.sleep(DELAY)

# Запис у Jekyll data
with open("_data/characters.yml", "w", encoding="utf-8") as f:
    yaml.dump(output, f, allow_unicode=True, sort_keys=False)

print("✅ Characters updated successfully")
