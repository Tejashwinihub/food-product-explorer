import { useMemo, useState } from 'react'

import CategoryFilter from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProductList from '../components/ProductList'
import RatingFilter from '../components/RatingFilter'
import SearchBar from '../components/SearchBar'
import { useProducts } from '../hooks/useProducts'
import { filterProducts, getCategories } from '../utils/productUtils'

export default function ProductsPage() {
  const { products, loading, error, retry } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [minRating, setMinRating] = useState(0)

  const categoryOptions = useMemo(() => getCategories(products), [products])
  const filteredProducts = useMemo(
    () => filterProducts(products, { search, category, minRating }),
    [products, search, category, minRating],
  )

  const hasFilters = search.trim().length > 0 || category !== 'all' || minRating > 0

  if (loading) {
    return <LoadingState message="Loading products..." />
  }

  if (error) {
    return (
      <div className="page-panel">
        <ErrorState title="Unable to load products." onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="page-panel">
      <header className="page-header">
        <div>
          <p className="eyebrow">Fresh picks</p>
          <h1>Explore Food Products</h1>
        </div>
        <span className="results-pill">{filteredProducts.length} results</span>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} options={categoryOptions} onChange={setCategory} />
        <RatingFilter value={minRating} onChange={setMinRating} />
        {hasFilters ? (
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setSearch('')
              setCategory('all')
              setMinRating(0)
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  )
}
