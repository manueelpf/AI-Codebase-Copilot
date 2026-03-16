from datetime import datetime
from pydantic import BaseModel, HttpUrl


class RepositoryCreate(BaseModel):
    github_url: HttpUrl
    branch: str | None = None


class RepositoryResponse(BaseModel):
    id: int
    name: str
    github_url: str
    branch: str | None
    local_path: str | None
    status: str
    last_indexed_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}