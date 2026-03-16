import { apiClient } from "./client"
import type {
  CreateRepositoryPayload,
  Repository,
  RepositoryFile,
} from "../types/repository"

export async function fetchRepositories(): Promise<Repository[]> {
  const response = await apiClient.get<Repository[]>("/repositories")
  return response.data
}

export async function fetchRepository(id: number): Promise<Repository> {
  const response = await apiClient.get<Repository>(`/repositories/${id}`)
  return response.data
}

export async function fetchRepositoryFiles(id: number): Promise<RepositoryFile[]> {
  const response = await apiClient.get<RepositoryFile[]>(`/repositories/${id}/files`)
  return response.data
}

export async function createRepository(
  payload: CreateRepositoryPayload,
): Promise<Repository> {
  const response = await apiClient.post<Repository>("/repositories", payload)
  return response.data
}