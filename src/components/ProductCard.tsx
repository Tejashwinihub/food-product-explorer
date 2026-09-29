import { Link } from 'react-router-dom'

import type { Product } from '../types/product'
import { formatCategory, formatPrice, formatRating, getDiscountedPrice } from '../utils/productUtils'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] || product.thumbnail
  const currentPrice = getDiscountedPrice(product.price, product.discountPercentage)

  return (
    <article className="product-card">
      <div className="card-image-wrap">
        <img
          src={imageUrl}
          alt={product.title}
          className="card-image"
          onError={(event) => {
            if (event.currentTarget.src !== product.thumbnail) {
              event.currentTarget.src = product.thumbnail
            }
          }}
        />
      </div>

      <div className="card-body">
        <div className="card-meta-row">
          <span className="category-badge">{formatCategory(product.category)}</span>
          <span className="rating-badge">★ {formatRating(product.rating)}</span>
        </div>

        <h3>{product.title}</h3>

        <div className="price-row">
          <span className="final-price">{formatPrice(currentPrice)}</span>
          <span className="original-price">{formatPrice(product.price)}</span>
        </div>

        <Link to={`/products/${product.id}`} className="secondary-button card-link">
          View Details
        </Link>
      </div>
    </article>
  )
}
