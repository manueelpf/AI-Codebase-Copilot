import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createRepository,
  fetchRepositories,
  fetchRepository,
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