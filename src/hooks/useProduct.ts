import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, getProduct } from '../services/api'
import type { Product } from '../types/product'
import { isFoodProduct, parseProductId } from '../utils/productUtils'

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadProduct = useCallback(async () => {
    const parsedId = parseProductId(productId)

    if (parsedId === null) {
      setProduct(null)
      setLoading(false)
      setError('Product not found')
      return
    }

    abortRef.current?.abort()

    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const response = await getProduct(parsedId, controller.signal)

      if (!isFoodProduct(response)) {
        setProduct(null)
        setError('Product not found')
        return
      }

      setProduct(response)
    } catch (caughtError) {
      if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
        return
      }

      if (caughtError instanceof ApiError) {
        setError(caughtError.status === 404 ? 'Product not found' : 'Unable to load product')
      } else {
        setError('Unable to load product')
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
      }
    }
  }, [productId])

  useEffect(() => {
    loadProduct()

    return () => {
      abortRef.current?.abort()
    }
  }, [loadProduct])

  return {
    product,
    loading,
    error,
    retry: loadProduct,
  }
}
