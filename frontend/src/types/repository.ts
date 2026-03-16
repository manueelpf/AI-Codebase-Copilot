export type Repository = {
  id: number
  name: string
  github_url: string
  branch: string | null
  local_path: string | null
  status: string
  last_indexed_at: string | null
  created_at: string
  updated_at: string
}

export type RepositoryFile = {
  id: number
  repository_id: number
  path: string
  language: string | null
  file_type: string | null
  size_bytes: number
  content_hash: string | null
  created_at: string
}

export type CreateRepositoryPayload = {
  github_url: string
  branch?: string | null
}

export type RepositoryFileContent = {
  path: string
  content: string
}