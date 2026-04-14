import requests
import yaml
import time
import os

# --- НАЛАШТУВАННЯ ---
API_KEY = "$2a$10$JluGEcJ9pdU87F13T10hrepUKFsdV5Kmyo9WOifGAwGaotAVEE0Ua"
AUTHOR_ID = 104580421
GAME_ID = 1
API_URL = "https://api.curseforge.com/v1/mods/search"

def fetch_author_mods(author_id):
    headers = {
        'x-api-key': API_KEY,
        'Accept': 'application/json'
    }
    
    params = {
        'gameId': GAME_ID,
        'authorId': author_id,
        'sortField': 2,
        'sortOrder': 'desc',
        'pageSize': 50
    }

    try:
        print(f"📡 Надсилаю запит до CurseForge для ID: {author_id}...")
        r = requests.get(API_URL, headers=headers, params=params, timeout=15)
        if r.status_code == 200:
            return r.json().get('data', [])
        else:
            print(f"❌ Помилка API: {r.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Помилка з'єднання: {e}")
        return None

def extract_game_versions(mod):
    """
    Збирає унікальні версії гри та сортує їх.
    """
    latest_files = mod.get('latestFiles', [])
    unique_versions = set()
    
    for file in latest_files:
        for v in file.get('gameVersions', []):
            if v and v[0].isdigit():
                unique_versions.add(v)
    
    def version_key(v):
        try:
            parts = []
            for p in v.split('.'):
                if p.isdigit():
                    parts.append(int(p))
            return parts
        except:
            return [0]

    return sorted(list(unique_versions), key=version_key, reverse=True)

def extract_mod_version(mod):
    """
    Отримує версію самого адону (назву останнього файлу).
    Наприклад: "v1.0.2" або "Release 2.5"
    """
    latest_files = mod.get('latestFiles', [])
    
    if not latest_files:
        return "Unknown"
        
    # Сортуємо файли за датою (найновіші - перші)
    # fileDate зазвичай у форматі ISO, тому текстове сортування працює
    sorted_files = sorted(latest_files, key=lambda x: x.get('fileDate', ''), reverse=True)
    
    # Беремо найновіший файл
    latest_file = sorted_files[0]
    
    # displayName - це те, як автор назвав файл (наприклад "MyAddon v1.0")
    # Якщо його немає, беремо fileName
    version_name = latest_file.get('displayName', latest_file.get('fileName', 'Unknown'))
    
    # Очищуємо від ".zip", якщо це ім'я файлу
    if version_name.endswith('.zip'):
        version_name = version_name.replace('.zip', '')
        
    return version_name

# --- ОСНОВНА ЛОГІКА ---

output = []
mods_list = fetch_author_mods(AUTHOR_ID)

if mods_list:
    print(f"✅ Знайдено модів: {len(mods_list)}")
    
    for mod in mods_list:
        website_url = mod.get('links', {}).get('websiteUrl', '')
        game_versions = extract_game_versions(mod)
        mod_version = extract_mod_version(mod) # Отримуємо версію адону

        mod_data = {
            "id": mod.get("id"),
            "name": mod.get("name"),
            "summary": mod.get("summary"),
            "downloads": mod.get("downloadCount"),
            "updated_at": mod.get("dateReleased"),
            "link": website_url,
            "logo": mod.get("logo", {}).get("thumbnailUrl"),
            "categories": [cat.get("name") for cat in mod.get("categories", [])],
            "game_versions": game_versions,
            "version": mod_version  # <-- Нове поле
        }

        output.append(mod_data)
        print(f"   -> {mod_data['name']} [Mod: {mod_version}] [Game: {game_versions[:1]}...]")

    if not os.path.exists('_data'):
        os.makedirs('_data')
        
    with open("_data/my_mods.yml", "w", encoding="utf-8") as f:
        yaml.dump(output, f, allow_unicode=True, sort_keys=False)

    print(f"\n🎉 Успіх! Дані збережено.")
else:
    print("⚠️ Модів не знайдено.")