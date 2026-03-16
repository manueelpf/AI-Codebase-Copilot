import { Link } from "react-router-dom"
import type { Repository } from "../../types/repository"
import "./RepositoryList.css"

type Props = {
  repositories: Repository[]
}

export function RepositoryList({ repositories }: Props) {
  return (
    <section className="repository-list card">
      <div className="repository-list__header">
        <h2 className="section-title">Imported repositories</h2>
      </div>

      <div className="repository-list__body">
        {repositories.length === 0 ? (
          <div className="empty-box muted">No repositories imported yet.</div>
        ) : (
          repositories.map((repo) => (
            <Link
              key={repo.id}
              to={`/repositories/${repo.id}`}
              className="repository-list__item"
            >
              <div className="repository-list__meta">
                <div className="repository-list__name">{repo.name}</div>
                <div className="repository-list__url">{repo.github_url}</div>
              </div>

              <span className="badge">{repo.status}</span>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}