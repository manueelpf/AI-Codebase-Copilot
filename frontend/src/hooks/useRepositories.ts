import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createRepository,
  fetchRepositories,
  fetchRepository,
  fetchRepositoryFileContent,
  fetchRepositoryFiles,
} from "../api/repositories"

export function useRepositories() {
  return useQuery({
    queryKey: ["repositories"],
    queryFn: fetchRepositories,
  })
}

export function useRepository(repositoryId: number) {
  return useQuery({
    queryKey: ["repository", repositoryId],
    queryFn: () => fetchRepository(repositoryId),
    enabled: Number.isFinite(repositoryId) && repositoryId > 0,
  })
}

export function useRepositoryFiles(repositoryId: number) {
  return useQuery({
    queryKey: ["repository-files", repositoryId],
    queryFn: () => fetchRepositoryFiles(repositoryId),
    enabled: Number.isFinite(repositoryId) && repositoryId > 0,
  })
}

export function useRepositoryFileContent(repositoryId: number, fileId: number | null){
  return useQuery({
    queryKey: ["repository-file-content", repositoryId, fileId],
    queryFn: () => fetchRepositoryFileContent(repositoryId, fileId as number),
    enabled: Number.isFinite(repositoryId) && repositoryId > 0 && fileId !== null,
  })
}

export function useCreateRepository() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRepository,
    onSuccess: (createdRepository) => {
      queryClient.invalidateQueries({ queryKey: ["repositories"] })
      queryClient.invalidateQueries({
        queryKey: ["repository", createdRepository.id],
      })
      queryClient.invalidateQueries({
        queryKey: ["repository-files", createdRepository.id],
      })
    },
  })
}