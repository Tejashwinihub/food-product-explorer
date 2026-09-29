import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page-panel not-found-panel" aria-live="polite">
      <h1>Page not found</h1>
      <Link to="/products" className="primary-button link-button">
        Go to products
      </Link>
    </div>
  )
}
