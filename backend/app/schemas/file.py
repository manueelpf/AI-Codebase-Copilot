from datetime import datetime
from pydantic import BaseModel


class FileResponse(BaseModel):
    id: int
    repository_id: int
    path: str
    language: str | None
    file_type: str | None
    size_bytes: int
    content_hash: str | None
    created_at: datetime

    model_config = {"from_attributes": True}