type RatingFilterProps = {
  value: number
  onChange: (value: number) => void
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="field-group">
      <label htmlFor="rating-filter" className="field-label">
        Minimum rating
      </label>
      <select
        id="rating-filter"
        className="select-input"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Filter by minimum rating"
      >
        <option value={0}>Any rating</option>
        <option value={3}>3.0+</option>
        <option value={4}>4.0+</option>
        <option value={4.5}>4.5+</option>
      </select>
    </div>
  )
}
