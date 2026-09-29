import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/products" className="brand-link" aria-label="Go to products page">
            <span className="brand-mark">FP</span>
            <span className="brand-copy">
              <span className="brand-title">Food Product Explorer</span>
              <span className="brand-subtitle">Smart pantry discovery</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="container main-content">{children}</main>
    </div>
  )
}
