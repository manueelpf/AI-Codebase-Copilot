from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Codebase Copilot"
    app_version: str = "0.1.0"
    app_env: str = "development"

    database_url: str = "postgresql+psycopg2://codecopilot:codecopilot@postgres:5432/codecopilot"
    workspace_dir: str = "/app/workspace"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()