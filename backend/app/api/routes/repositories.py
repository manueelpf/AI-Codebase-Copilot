from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import Repository, File
from app.schemas.repository import RepositoryCreate, RepositoryResponse
from app.schemas.file import FileResponse, FileContentResponse
from app.services.ingestion.github_loader import clone_repository, extract_repo_name
from app.services.ingestion.file_scanner import scan_repository_files
from app.core.config import settings

from pathlib import Path

router = APIRouter(prefix="/repositories", tags=["repositories"])


@router.post("", response_model=RepositoryResponse)
def create_repository(payload: RepositoryCreate, db: Session = Depends(get_db)) -> Repository:
    existing = db.query(Repository).filter(Repository.github_url == str(payload.github_url)).first()
    if existing:
        return existing

    repo = Repository(
        name=extract_repo_name(str(payload.github_url)),
        github_url=str(payload.github_url),
        branch=payload.branch,
        status="pending",
    )
    db.add(repo)
    db.commit()
    db.refresh(repo)

    try:
        cloned_path = clone_repository(
            github_url=str(payload.github_url),
            destination_root=settings.workspace_dir,
            branch=payload.branch,
        )
        repo.local_path = str(cloned_path)
        repo.status = "scanning"
        db.commit()
        db.refresh(repo)

        scanned_files = scan_repository_files(str(cloned_path))

        for file_data in scanned_files:
            db.add(
                File(
                    repository_id=repo.id,
                    path=file_data["path"],
                    language=file_data["language"],
                    file_type=file_data["file_type"],
                    size_bytes=file_data["size_bytes"],
                    content_hash=file_data["content_hash"],
                )
            )

        repo.status = "indexed_basic"
        repo.last_indexed_at = datetime.utcnow()
        db.commit()
        db.refresh(repo)
        return repo

    except Exception as exc:
        repo.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Repository ingestion failed: {str(exc)}") from exc


@router.get("", response_model=list[RepositoryResponse])
def list_repositories(db: Session = Depends(get_db)) -> list[Repository]:
    return db.query(Repository).order_by(Repository.created_at.desc()).all()


@router.get("/{repository_id}", response_model=RepositoryResponse)
def get_repository(repository_id: int, db: Session = Depends(get_db)) -> Repository:
    repo = db.query(Repository).filter(Repository.id == repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repo


@router.get("/{repository_id}/files", response_model=list[FileResponse])
def get_repository_files(repository_id: int, db: Session = Depends(get_db)) -> list[File]:
    repo = db.query(Repository).filter(Repository.id == repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    return (
        db.query(File)
        .filter(File.repository_id == repository_id)
        .order_by(File.path.asc())
        .all()
    )

@router.get("/{repository_id}/files/{file_id}/content", response_model=FileContentResponse)
def get_repository_file_content(repository_id: int, file_id: int, db: Session = Depends(get_db)) -> FileContentResponse:
    repo = db.query(Repository).filter(Repository.id == repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    file = (
        db.query(File)
        .filter(File.id == file_id, File.repository_id == repository_id)
        .first()
    )

    if not file:
        raise HTTPException(status_code=404, detail="File not found")

    if not repo.local_path:
        raise HTTPException(status_code=404, detail="Repository local path is not available")

    absolute_path = Path(repo.local_path) / file.path

    if not absolute_path.exists() or not absolute_path.is_file():
        raise HTTPException(status_code=404, detail="File content not found on disk")

    try:
        content = absolute_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = absolute_path.read_text(encoding="utf-8", errors="replace")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Error reading file content: {str(exc)}") from exc

    return FileContentResponse(
        path=file.path,
        content=content
    )