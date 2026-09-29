type CategoryFilterProps = {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export default function CategoryFilter({
  value,
  options,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="field-group">
      <label htmlFor="category-filter" className="field-label">
        Category
      </label>
      <select
        id="category-filter"
        className="select-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {options.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
