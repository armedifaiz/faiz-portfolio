#!/usr/bin/env python3
"""
Sync GitHub repos to projects.json using gh auth token.
"""

import json
import os
import requests
from pathlib import Path

# Load token from .env
env_path = Path(__file__).resolve().parent / ".env"
token = None
if env_path.exists():
    for line in env_path.read_text().splitlines():
        if line.startswith("GITHUB_TOKEN="):
            token = line.split("=", 1)[1].strip()
            break

GITHUB_USERNAME = "armedifaiz"
DATA_FILE = Path(__file__).resolve().parent.parent / "src" / "data" / "projects.json"

headers = {"Authorization": f"Bearer {token}"} if token else {}

def fetch_repos():
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
    params = {"per_page": 100, "sort": "updated", "direction": "desc"}
    resp = requests.get(url, params=params, headers=headers, timeout=30)
    if resp.status_code == 403:
        print("Rate limited. Check token.")
    resp.raise_for_status()
    return resp.json()

def to_project(repo):
    return {
        "id": repo["name"],
        "name": repo["name"],
        "description": (repo.get("description") or "").strip(),
        "githubUrl": repo["html_url"],
        "demoUrl": repo.get("homepage"),
        "language": repo.get("language"),
        "topics": repo.get("topics", []),
        "stars": repo.get("stargazers_count", 0),
        "updatedAt": repo.get("updated_at"),
        "thumbnail": None,
    }

def main():
    print("Fetching repos from GitHub...")
    repos = fetch_repos()
    projects = [to_project(r) for r in repos]

    # Preserve thumbnails from existing
    existing = {}
    if DATA_FILE.exists():
        for p in json.loads(DATA_FILE.read_text()):
            if p.get("thumbnail"):
                existing[p["id"]] = p["thumbnail"]

    for p in projects:
        if p["id"] in existing:
            p["thumbnail"] = existing[p["id"]]

    DATA_FILE.write_text(json.dumps(projects, indent=2, ensure_ascii=False))
    print(f"Synced {len(projects)} projects to {DATA_FILE.name}")

if __name__ == "__main__":
    main()