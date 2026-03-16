import { useParams } from "react-router-dom"
import { AppLayout } from "../components/layout/AppLayout"
import { FileList } from "../components/repository/FileList"
import { useRepository, useRepositoryFileContent, useRepositoryFiles } from "../hooks/useRepositories"
import "./RepositoryPage.css"
import type { RepositoryFile } from "../types/repository"
import { useState } from "react"
import { FilePreviewModal } from "../components/repository/FilePreviewModal"

export function RepositoryPage() {
  const params = useParams()
  const repositoryId = Number(params.repositoryId)

  const [selectedFile, setSelectedFile] = useState<RepositoryFile | null>(null)

  const { data: repository, isLoading: repoLoading } = useRepository(repositoryId)
  const { data: files = [], isLoading: filesLoading } = useRepositoryFiles(repositoryId)

  const { data: fileContentData, isLoading: fileContentLoading } = useRepositoryFileContent(repositoryId, selectedFile?.id ?? null)

  const handleClosePreview = () => {
    setSelectedFile(null)
  }

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
              <span className="badge">Files found: {files.length}</span>
            </div>
          </section>

          {filesLoading ? (
            <div className="card loading-box">Loading file preview...</div>
          ) : (
            <FileList files={files} onSelectFile={setSelectedFile} />
          )}

          <FilePreviewModal
            isOpen={!!selectedFile}
            file={selectedFile}
            content={fileContentData?.content ?? ""}
            isLoading={fileContentLoading}
            onClose={handleClosePreview}
          />
          
        </div>
      )}
    </AppLayout>
  )
}