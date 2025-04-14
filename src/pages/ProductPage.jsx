import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";


const ProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCakeDetails = async() => {
            try {
                setLoading(true)
                const response = await fetch(`https://dummyjson.com/products/${id}`)

                if (!response.ok) {
                    throw new Error('failed to fetch product details')
                }

                const data = await response.json()

                const transformedProduct = {
                    id: data.id,
                    name: data.title,
                    description: data.description,
                    price: data.price.toFixed(2),
                    rating: data.rating.toFixed(1),
                    image: data.thumbnail,
                    category: ["Dedication", "Bento"],
                    flavors: ["Moist Choco", "Mocha Chiffon", "Vanilla Chiffon", "Strawberry Chiffon"],
                    sizes: ["4x2", "5x3", "6x4"],
                }

                setProduct(transformedProduct)
                setLoading(false)
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            }
        }

        if (id) {
            fetchCakeDetails()
        }
    }, [id])

    const handleGoBack = () => {
        navigate(-1);
    };


    if (loading) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg font-medium">Loading product details...</div>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-red-500 p-4 border border-red-300 rounded">
              Error loading product details: {error}
            </div>
            <button 
              onClick={handleGoBack}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Go Back
            </button>
          </div>
        );
      }
    
      if (!product) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-red-500 p-4 border border-red-300 rounded">
              Product not found
            </div>
            <button 
              onClick={handleGoBack}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Go Back
            </button>
          </div>
        );
      }


    return (
        <div>
            <Navbar />
            <button onClick={handleGoBack}>{"< Go Back"}</button>
            <div className="flex">
                <div>
                    <img src={product.image} alt=""/>
                </div>
                <div>
                    <h1>{product.name}</h1>
                    <h2>{product.rating} Stars</h2>
                    <div className="flex">
                        {product.category.map(category => (
                            <Button text={category} size="small" type="secondary" />
                        ))}
                    </div>
                    <p>{product.description}</p>

                    <h3>Size</h3>
                    {product.sizes.map(size => (
                        <label key={size} className="block mb-1">
                            <input type="radio" name="size" value={size}/>{size}
                        </label>
                    ))}
                    <h3>Flavor</h3>
                    {product.flavors.map(flavor => (
                        <label key={flavor} className="block mb-1">
                            <input type="radio" name="flavor" value={flavor}/>{flavor}
                        </label>
                    ))}
                    <h3>Dedication / Request</h3>
                    <textarea name="dedication" id="dedication"></textarea>
                </div>
            </div>

        </div>
    )

}

export default ProductPage