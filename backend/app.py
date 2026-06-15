from fastapi import FastAPI
from github_service import (
    get_merged_prs,
    get_leaderboard,
    get_contributors,
    get_entities
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to OOP Kingdom Backend"}


@app.get("/prs")
def prs():
    return get_merged_prs()


@app.get("/leaderboard")
def leaderboard():
    return get_leaderboard()

@app.get("/contributors")
def contributors():
    return get_contributors()

@app.get("/entities")
def entities():
    return get_entities()