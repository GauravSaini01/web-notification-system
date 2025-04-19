import json
from pathlib import Path

TOKENS_FILE = Path("tokens.json")

def load_tokens():
    if TOKENS_FILE.exists():
        try:
            with open(TOKENS_FILE, "r") as f:
                content = f.read().strip()
                return json.loads(content) if content else []
        except json.JSONDecodeError:
            print("⚠️ Warning: Invalid JSON in tokens file. Resetting to empty list.")
            return []
    return []

def save_tokens(tokens):
    with open(TOKENS_FILE, "w") as f:
        json.dump(tokens, f, indent=2)

def register_token(new_token):
    tokens = load_tokens()
    if new_token not in tokens:
        tokens.append(new_token)
        save_tokens(tokens)
