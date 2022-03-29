import json
from pathlib import Path

schema_path = Path(__file__).parent / "json_id.schema.json"

with open(schema_path, "r") as f:
    json_id_schema = json.load(f)
