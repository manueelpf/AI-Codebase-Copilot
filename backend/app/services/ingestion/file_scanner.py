from pathlib import Path

from app.services.ingestion.ignore_rules import should_ignore
from app.services.ingestion.language_detector import detect_language, detect_file_type
from app.utils.hashing import sha256_text


def scan_repository_files(repo_path: str) -> list[dict]:
    root = Path(repo_path)
    results: list[dict] = []

    for path in root.rglob("*"):
        if not path.is_file():
            continue

        relative_path = path.relative_to(root)

        if should_ignore(relative_path) or should_ignore(path):
            continue

        try:
            content = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        results.append(
            {
                "path": str(relative_path).replace("\\", "/"),
                "language": detect_language(path),
                "file_type": detect_file_type(path),
                "size_bytes": path.stat().st_size,
                "content_hash": sha256_text(content),
            }
        )

    return results