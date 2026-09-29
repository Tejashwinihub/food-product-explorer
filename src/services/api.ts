import type { Product, ProductsResponse } from '../types/product'

const API_BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, { signal })

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError('Product not found', 404)
      }

      throw new ApiError('Unable to load product/products', response.status)
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError('Unable to load product/products')
  }
}

export async function getProducts(signal?: AbortSignal): Promise<ProductsResponse> {
  return request<ProductsResponse>('/products?limit=0', signal)
}

export async function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  return request<Product>(`/products/${id}`, signal)
}
