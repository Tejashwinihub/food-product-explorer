type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="field-group field-group-search">
      <label htmlFor="product-search" className="field-label">
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        className="text-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title"
        aria-label="Search products by title"
      />
    </div>
  )
}
