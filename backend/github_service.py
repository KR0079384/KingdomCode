import requests

OWNER = "Hemanthkumar2k04"
REPO = "OOP-Kingdom"

# Users who should not appear in the leaderboard
EXCLUDED_USERS = {
    "GowsiSM"
}


def get_merged_prs():
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/pulls?state=closed"

    response = requests.get(url)

    if response.status_code != 200:
        return {"error": response.text}

    prs = response.json()

    merged_prs = []

    for pr in prs:
        if pr["merged_at"] is None:
            continue

        author = pr["user"]["login"]

        if author in EXCLUDED_USERS:
            continue

        merged_prs.append({
            "number": pr["number"],
            "title": pr["title"],
            "author": author,
            "merged_at": pr["merged_at"]
        })

    return merged_prs


def get_leaderboard():
    prs = get_merged_prs()

    if isinstance(prs, dict) and "error" in prs:
        return prs

    leaderboard = {}

    for pr in prs:
        author = pr["author"]

        if author not in leaderboard:
            leaderboard[author] = {
                "username": author,
                "merged_prs": 0,
                "points": 0
            }

        leaderboard[author]["merged_prs"] += 1

        # MVP scoring
        leaderboard[author]["points"] += 10

    return sorted(
        leaderboard.values(),
        key=lambda x: x["points"],
        reverse=True
    )

def get_contributors():
    prs = get_merged_prs()

    if isinstance(prs, dict) and "error" in prs:
        return prs

    contributors = {}

    for pr in prs:
        author = pr["author"]

        if author not in contributors:
            contributors[author] = {
                "username": author,
                "merged_prs": 0,
                "points": 0,
                "contributions": []
            }

        contributors[author]["merged_prs"] += 1
        contributors[author]["points"] += 10

        contributors[author]["contributions"].append({
            "pr_number": pr["number"],
            "title": pr["title"],
            "merged_at": pr["merged_at"]
        })

    return list(contributors.values())

import re

def extract_entity_name(title):
    title = title.lower()

    keywords = [
        "hospital",
        "tavern",
        "barracks",
        "market",
        "castle",
        "farm",
        "lumberyard",
        "cityhall"
    ]

    for keyword in keywords:
        if keyword in title:
            return keyword.capitalize()

    return None


def get_entities():
    prs = get_merged_prs()

    if isinstance(prs, dict) and "error" in prs:
        return prs

    entities = []

    for pr in prs:
        entity_name = extract_entity_name(pr["title"])

        if entity_name:
            entities.append({
                "name": entity_name,
                "contributor": pr["author"],
                "pr_number": pr["number"],
                "merged_at": pr["merged_at"]
            })

    return entities