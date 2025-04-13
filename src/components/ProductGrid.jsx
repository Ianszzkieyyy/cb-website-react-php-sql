import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                setLoading(true)
                const response = await fetch('https://dummyjson.com/products')

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json();

                const transformedProducts = data.products.map(product => ({
                    id: product.id,
                    name: product.title,
                    price: product.price.toFixed(2),
                    rating: product.rating.toFixed(1),
                    img: product.thumbnail
                }))

                setProducts(transformedProducts)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-medium">Loading products...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 border border-red-300 rounded">
                Error loading products: {error}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
} 

export default ProductGrid