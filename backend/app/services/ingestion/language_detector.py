from pathlib import Path


EXTENSION_LANGUAGE_MAP = {
    ".py": "python",
    ".ts": "typescript",
    ".tsx": "typescriptreact",
    ".js": "javascript",
    ".jsx": "javascriptreact",
    ".java": "java",
    ".go": "go",
    ".rs": "rust",
    ".cpp": "cpp",
    ".c": "c",
    ".cs": "csharp",
    ".rb": "ruby",
    ".php": "php",
    ".html": "html",
    ".css": "css",
    ".scss": "scss",
    ".json": "json",
    ".yml": "yaml",
    ".yaml": "yaml",
    ".md": "markdown",
    ".sql": "sql",
    ".sh": "shell",
}


def detect_language(path: Path) -> str | None:
    return EXTENSION_LANGUAGE_MAP.get(path.suffix.lower())


def detect_file_type(path: Path) -> str:
    suffix = path.suffix.lower()

    if suffix in {".py", ".ts", ".tsx", ".js", ".jsx", ".java", ".go", ".rs", ".cpp", ".c", ".cs"}:
        return "source"
    if suffix in {".md"}:
        return "documentation"
    if suffix in {".json", ".yml", ".yaml", ".toml", ".ini"}:
        return "config"
    if "test" in path.name.lower():
        return "test"
    return "other"