import { useMemo, useState } from "react"
import type { RepositoryFile } from "../../types/repository"
import { formatBytes } from "../../utils/formatBytes"
import "./FileList.css"

type Props = {
  files: RepositoryFile[]
  onSelectFile: (file: RepositoryFile) => void
}

export function FileList({ files, onSelectFile }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return files;

    return files.filter((file) => {
      const path = file.path.toLowerCase();
      const language = (file.language ?? "").toLocaleLowerCase();
      const fileType = (file.file_type ?? "").toLocaleLowerCase();
    
      return (
        path.includes(query) || language.includes(query) || fileType.includes(query)
      )
    })
  }, [files, searchTerm]);

  return (
    <section className="file-list card">
      <div className="file-list__header">
        <div className="file-list__header-left">
          <h2 className="section-title">Files</h2>
          <span className="file-list__count">{files.length}</span>
        </div>

        <div className="file-list__toolbar">
          <input
            type="text"
            className="file-list__search"
            placeholder="Search files by path, language, or type..."
            value={searchTerm}
            onClick={() => !isOpen && setIsOpen(true)}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="file-list__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className={`file-list__chevron ${isOpen ? "file-list__chevron--open" : ""}`}>
            ▾
          </span>
        </button>
      </div>
      


      <div className={`file-list__content ${isOpen ? "file-list__content--open" : ""}`}>
        

        <div className="file-list__body">
          {filteredFiles.length === 0 ? (
            <div className="empty-box muted">
              No files match your search.
            </div>
          ) : (
            filteredFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                className="file-list__item file-list__item--button"
                onClick={() => onSelectFile(file)}
              >
                <div className="file-list__path">{file.path}</div>
                <div className="file-list__meta">
                  {file.language ?? "unknown"} · {file.file_type ?? "other"} · {formatBytes(file.size_bytes)}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  )
}