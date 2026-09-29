import type { Product, ProductFilters } from '../types/product'

const FOOD_PRODUCT_CATEGORIES = ['groceries', 'kitchen-accessories']

export function isFoodProduct(product: Pick<Product, 'category'>): boolean {
  return FOOD_PRODUCT_CATEGORIES.includes(product.category.toLowerCase())
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCategory(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function formatRating(value: number): string {
  return `${value.toFixed(1)} / 5`
}

export function getDiscountedPrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100)
}

export function getStockInfo(stock: number): string {
  return stock > 0 ? 'In stock' : 'Out of stock'
}

export function parseProductId(value: string | undefined): number | null {
  if (!value) {
    return null
  }

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const normalizedSearch = filters.search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesFood = isFoodProduct(product)
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.title.toLowerCase().includes(normalizedSearch)

    const matchesCategory =
      filters.category === 'all' || product.category === filters.category

    const matchesRating = product.rating >= filters.minRating

    return matchesFood && matchesSearch && matchesCategory && matchesRating
  })
}

export function getCategories(products: Product[]): string[] {
  const categories = new Set(
    products
      .filter((product) => isFoodProduct(product))
      .map((product) => product.category),
  )

  return Array.from(categories).sort((first, second) => first.localeCompare(second))
}
