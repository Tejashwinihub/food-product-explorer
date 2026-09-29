type EmptyStateProps = {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="state-card" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  )
}
