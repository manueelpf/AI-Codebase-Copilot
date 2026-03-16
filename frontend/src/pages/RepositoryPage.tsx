import { useParams } from "react-router-dom"
import { AppLayout } from "../components/layout/AppLayout"
import { FileList } from "../components/repository/FileList"
import { useRepository, useRepositoryFiles } from "../hooks/useRepositories"
import "./RepositoryPage.css"

export function RepositoryPage() {
  const params = useParams()
  const repositoryId = Number(params.repositoryId)

  const { data: repository, isLoading: repoLoading } = useRepository(repositoryId)
  const { data: files = [], isLoading: filesLoading } = useRepositoryFiles(repositoryId)

  return (
    <AppLayout>
      {repoLoading ? (
        <div className="card loading-box">Loading repository...</div>
      ) : !repository ? (
        <div className="card empty-box">Repository not found.</div>
      ) : (
        <div className="repository-page">
          <section className="repository-page__summary card">
            <h1 className="repository-page__title">{repository.name}</h1>
            <p className="repository-page__url">{repository.github_url}</p>

            <div className="repository-page__badges">
              <span className="badge">{repository.status}</span>
              <span className="badge">Files indexed: {files.length}</span>
            </div>
          </section>

          {filesLoading ? (
            <div className="card loading-box">Loading files...</div>
          ) : (
            <FileList files={files} />
          )}
        </div>
      )}
    </AppLayout>
  )
}