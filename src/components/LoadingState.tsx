type LoadingStateProps = {
  message: string
}

export default function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="state-card" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
