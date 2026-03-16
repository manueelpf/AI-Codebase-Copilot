import shutil
from pathlib import Path
from git import Repo


def extract_repo_name(github_url: str) -> str:
    name = github_url.rstrip("/").split("/")[-1]
    if name.endswith(".git"):
        name = name[:-4]
    return name


def clone_repository(github_url: str, destination_root: str, branch: str | None = None) -> Path:
    repo_name = extract_repo_name(github_url)
    destination = Path(destination_root) / repo_name

    if destination.exists():
        shutil.rmtree(destination)

    clone_kwargs = {}
    if branch:
        clone_kwargs["branch"] = branch

    Repo.clone_from(github_url, destination, **clone_kwargs)
    return destination