import { Link, useParams } from 'react-router-dom'

import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import { useProduct } from '../hooks/useProduct'
import { formatCategory, formatPrice, formatRating, getDiscountedPrice, getStockInfo } from '../utils/productUtils'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { product, loading, error, retry } = useProduct(id)

  if (loading) {
    return <LoadingState message="Loading product..." />
  }

  if (error === 'Product not found' || (!error && !product)) {
    return (
      <div className="page-panel detail-panel">
        <div className="detail-actions">
          <Link to="/products" className="secondary-button">
            Back to products
          </Link>
        </div>
        <ErrorState title="Product not found." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-panel detail-panel">
        <div className="detail-actions">
          <Link to="/products" className="secondary-button">
            Back to products
          </Link>
        </div>
        <ErrorState title="Unable to load product." onRetry={retry} />
      </div>
    )
  }

  if (!product) {
    return null
  }

  const imageUrl = product.images[0] || product.thumbnail
  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage)

  return (
    <div className="page-panel detail-panel">
      <div className="detail-actions">
        <Link to="/products" className="secondary-button">
          Back to products
        </Link>
      </div>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img
            src={imageUrl}
            alt={product.title}
            className="detail-image"
            onError={(event) => {
              if (event.currentTarget.src !== product.thumbnail) {
                event.currentTarget.src = product.thumbnail
              }
            }}
          />
        </div>

        <div className="detail-content">
          <div className="detail-header-row">
            <span className="category-badge">{formatCategory(product.category)}</span>
            <span className="stock-badge">{getStockInfo(product.stock)}</span>
          </div>

          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>

          <div className="price-block">
            <div className="price-main-row">
              <span className="final-price detail-price">{formatPrice(finalPrice)}</span>
              <span className="original-price detail-original-price">{formatPrice(product.price)}</span>
            </div>
            <span className="discount-chip">-{product.discountPercentage.toFixed(0)}% off</span>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Brand</span>
              <strong>{product.brand || 'Not specified'}</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <strong>{formatCategory(product.category)}</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rating</span>
              <strong>{formatRating(product.rating)}</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Availability</span>
              <strong>{product.availabilityStatus}</strong>
            </div>
          </div>

          <div className="detail-summary">
            <p>
              <span className="detail-label">Warranty</span>
              {product.warrantyInformation}
            </p>
            <p>
              <span className="detail-label">Shipping</span>
              {product.shippingInformation}
            </p>
            <p>
              <span className="detail-label">Return policy</span>
              {product.returnPolicy}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
