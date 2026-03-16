import type { RepositoryFile } from "../../types/repository"
import "./FileList.css"

type Props = {
  files: RepositoryFile[]
}

export function FileList({ files }: Props) {
  return (
    <section className="file-list card">
      <div className="file-list__header">
        <h2 className="section-title">Files</h2>
      </div>

      <div className="file-list__body">
        {files.length === 0 ? (
          <div className="empty-box muted">No files found.</div>
        ) : (
          files.map((file) => (
            <div key={file.id} className="file-list__item">
              <div className="file-list__path">{file.path}</div>
              <div className="file-list__meta">
                {file.language ?? "unknown"} · {file.file_type ?? "other"} · {file.size_bytes} bytes
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}