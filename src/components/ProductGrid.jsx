import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductGrid = ({activeFilters}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 12

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                setLoading(true)

                const queryParams = []

                if (activeFilters?.categories) {
                    queryParams.push(`categories=${activeFilters.categories.join(',')}`);
                }
                
                if (activeFilters?.sizes) {
                    queryParams.push(`sizes=${activeFilters.sizes.join(',')}`);
                }
                
                if (activeFilters?.minPrice) {
                    queryParams.push(`minPrice=${activeFilters.minPrice}`);
                }
                
                if (activeFilters?.maxPrice) {
                    queryParams.push(`maxPrice=${activeFilters.maxPrice}`);
                }

                if (activeFilters?.search) {
                    queryParams.push(`search=${encodeURIComponent(activeFilters.search)}`);
                }

                if (activeFilters?.sort) {
                    queryParams.push(`sort=${activeFilters.sort}`);
                }

                const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
                const response = await fetch(`http://localhost/cakes_bakes_backend/products/${queryString}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json();

                const transformedProducts = data.map(product => ({
                    id: product.product_id,
                    name: product.name,
                    price: parseFloat(product.price).toFixed(2),
                    rating: parseFloat(product.rating).toFixed(1),
                    img: `http://localhost/cakes_bakes_backend/uploads/thumbnails/${product.image_url}`
                }))

                setProducts(transformedProducts)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [activeFilters])


    useEffect(() => {
        if (!activeFilters?.search) {
            setFilteredProducts(products);
            return;
        }
        
        const searchLower = activeFilters.search.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchLower)
        );
        
        setFilteredProducts(filtered);
    }, [products, activeFilters?.search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters]);

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

    const productsToDisplay = activeFilters?.search ? filteredProducts : products;
    
    if (productsToDisplay.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-lg font-medium">No products found matching your search criteria.</p>
                <p className="text-gray-500 mt-2">Try using different keywords or filters.</p>
            </div>
        );
    }

    const lastCardIndex = currentPage * cardsPerPage
    const firstCardIndex = lastCardIndex - cardsPerPage

    const currentCards = productsToDisplay.slice(firstCardIndex, lastCardIndex)

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mb-6">
                {currentCards.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div>
                <Pagination totalCards={productsToDisplay.length} cardsPerPage={cardsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>

    )
} 

export default ProductGrid