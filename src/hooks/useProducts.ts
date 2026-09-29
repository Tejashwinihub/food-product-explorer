import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, getProducts } from '../services/api'
import type { Product } from '../types/product'
import { isFoodProduct } from '../utils/productUtils'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadProducts = useCallback(async () => {
    abortRef.current?.abort()

    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const response = await getProducts(controller.signal)
      const foodProducts = response.products.filter((product) => isFoodProduct(product))
      setProducts(foodProducts)
    } catch (caughtError) {
      if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
        return
      }

      const message =
        caughtError instanceof ApiError ? caughtError.message : 'Unable to load products'
      setError(message)
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    loadProducts()

    return () => {
      abortRef.current?.abort()
    }
  }, [loadProducts])

  return {
    products,
    loading,
    error,
    retry: loadProducts,
  }
}
