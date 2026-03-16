import { useState } from "react"
import "./RepositoryImportForm.css"

type Props = {
  onSubmit: (githubUrl: string) => Promise<void> | void
  isLoading?: boolean
}

export function RepositoryImportForm({ onSubmit, isLoading = false }: Props) {
  const [githubUrl, setGithubUrl] = useState("")

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = githubUrl.trim()
    if (!trimmed || isLoading) return

    await onSubmit(trimmed)
    setGithubUrl("")
  }

  return (
    <form className="repository-import card" onSubmit={handleSubmit}>
      <h2 className="section-title">Import repository</h2>

      <div className="repository-import__controls">
        <input
          type="url"
          placeholder="https://github.com/owner/repo"
          value={githubUrl}
          onChange={(event) => setGithubUrl(event.target.value)}
          className="repository-import__input"
        />
        <button type="submit" disabled={isLoading} className="repository-import__button">
          {isLoading ? "Importing..." : "Import Repository"}
        </button>
      </div>
    </form>
  )
}