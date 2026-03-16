from pathlib import Path

IGNORED_DIRS = {
    ".git",
    "node_modules",
    "dist",
    "build",
    ".next",
    ".venv",
    "venv",
    "__pycache__",
    ".idea",
    ".vscode",
    "coverage",
}

IGNORED_FILE_NAMES = {
    ".DS_Store",
}

IGNORED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".tar",
    ".gz",
    ".mp4",
    ".mp3",
    ".woff",
    ".woff2",
    ".ttf",
    ".lock",
}

MAX_FILE_SIZE_BYTES = 1_000_000


def should_ignore(path: Path) -> bool:
    if any(part in IGNORED_DIRS for part in path.parts):
        return True

    if path.name in IGNORED_FILE_NAMES:
        return True

    if path.suffix.lower() in IGNORED_EXTENSIONS:
        return True

    if path.is_file():
        try:
            if path.stat().st_size > MAX_FILE_SIZE_BYTES:
                return True
        except OSError:
            return True

    return False