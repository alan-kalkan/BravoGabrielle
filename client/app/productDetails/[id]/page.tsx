'use client'

import { useEffect, useState, use } from 'react'
import { data_products } from '../../assets/data'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'

interface Product {
  id: string
  title: string
  price: number
  description: string
  image: string
}

interface PageParams {
  id: string
}

export default function ProductDetails({
  params,
}: {
  params: Promise<PageParams>
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const resolvedParams = use(params)
  const { addToCart } = useCart()

  useEffect(() => {
    const foundProduct = data_products.find((p: Product) => p.id === resolvedParams.id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [resolvedParams.id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div>
          <Image 
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
          
          <p className="text-2xl font-bold text-red-600">${product.price}</p>
          
          <p className="text-lg text-gray-600">{product.description}</p>
          
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md font-bold cursor-pointer mt-2"
            onClick={() => {
              addToCart(product)
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 