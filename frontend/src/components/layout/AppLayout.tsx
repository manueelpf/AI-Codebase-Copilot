import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import "./AppLayout.css"

type Props = {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="page-container app-header__inner">
          <Link to="/" className="app-logo">
            AI Codebase Copilot
          </Link>
        </div>
      </header>

      <main className="page-container app-main">{children}</main>
    </div>
  )
}