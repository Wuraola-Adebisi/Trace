from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    max_upload_bytes: int = 15 * 1024 * 1024
    chunk_size_chars: int = 1200
    chunk_overlap_chars: int = 180

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
