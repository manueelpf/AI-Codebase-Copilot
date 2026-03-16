import { AppLayout } from "../components/layout/AppLayout"
import { RepositoryImportForm } from "../components/repository/RepositoryImportForm"
import { RepositoryList } from "../components/repository/RepositoryList"
import { useCreateRepository, useRepositories } from "../hooks/useRepositories"
import "./HomePage.css"

export function HomePage() {
  const { data: repositories = [], isLoading } = useRepositories()
  const createRepositoryMutation = useCreateRepository()

  const handleImport = async (githubUrl: string) => {
    await createRepositoryMutation.mutateAsync({ github_url: githubUrl })
  }

  return (
    <AppLayout>
      <div className="home-page">
        <RepositoryImportForm
          onSubmit={handleImport}
          isLoading={createRepositoryMutation.isPending}
        />

        {isLoading ? (
          <div className="card loading-box">Loading repositories...</div>
        ) : (
          <RepositoryList repositories={repositories} />
        )}
      </div>
    </AppLayout>
  )
}