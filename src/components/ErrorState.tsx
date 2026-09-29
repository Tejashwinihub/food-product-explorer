type ErrorStateProps = {
  title: string
  retryLabel?: string
  onRetry?: () => void
}

export default function ErrorState({
  title,
  retryLabel = 'Retry',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="state-card state-card-error" role="alert">
      <p className="state-title">{title}</p>
      {onRetry ? (
        <button type="button" className="primary-button" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  )
}
