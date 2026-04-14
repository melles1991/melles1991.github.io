from pathlib import Path
import json
import yaml

ROOT = Path(__file__).resolve().parents[1]
LEGACY = ROOT / 'legacy-src' / '_data'
OUT = ROOT / 'content' / 'data'
OUT.mkdir(parents=True, exist_ok=True)

MAP = {
    'characters.yml': 'characters.json',
    'my_mods.yml': 'mods.json',
    'socials.yml': 'socials.json',
}

for src_name, dst_name in MAP.items():
    src = LEGACY / src_name
    dst = OUT / dst_name
    data = yaml.safe_load(src.read_text(encoding='utf-8'))
    dst.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'generated: {dst.relative_to(ROOT)}')
