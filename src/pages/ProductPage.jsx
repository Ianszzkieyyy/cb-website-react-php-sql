import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../components/context/CartContext";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import DisplayRating from "../components/DisplayRating";

import CartIcon from "../assets/icons/shopping-cart.svg?react"


const ProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedSize, setSelectedSize] = useState("4x2")
    const [selectedFlavor, setSelectedFlavor] = useState("Moist Choco")
    const [dedicationMsg, setDedicationMsg] = useState("")

    const { addToCart } = useCart()

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

    const handleTextChange = (e) => {
      setDedicationMsg(e.target.value)
    }


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
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="flex gap-20 p-16">
                    <div className="sticky top-20 self-start w-96 h-96 flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <img src={product.image} className="object-cover w-full h-full" alt=""/>
                    </div>
                    <div>
                        <h1 className="font-domine font-bold text-4xl mb-4">{product.name}</h1>
                        <div className="flex gap-4 mb-8"> <DisplayRating rating={product.rating}/> {product.rating} Stars</div>
                        <div className="flex gap-2 mb-12 overflow-auto">
                            {product.category.map(category => (
                                <Button text={category} size="small" type="accent" />
                            ))}
                        </div>

                        <p className="text-lg mb-16">{product.description}</p>

                        <h3 className="font-semibold text-md mb-4">Size</h3>
                        <div className="mb-16 flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <label key={size} className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedSize === size ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                    <input type="radio" name="size" value={size} className="sr-only" checked={selectedSize === size} onChange={() => setSelectedSize(size)} />{size}
                                </label>
                            ))}
                        </div>

                        <h3 className="font-semibold text-md mb-4">Flavor</h3>
                        <div className="mb-16 flex flex-wrap gap-3">
                            {product.flavors.map((flavor) => (
                                <label key={flavor} className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedFlavor === flavor ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                    <input type="radio" name="flavor" value={flavor} className="sr-only" checked={selectedFlavor === flavor} onChange={() => setSelectedFlavor(flavor)} />{flavor}
                                </label>
                            ))}
                        </div>
                        
                        <h3 className="font-semibold text-md mb-2">Dedication / Requests</h3>
                        <p className="text-sm mb-4">If you wish to leave it empty, please input N/A. </p>
                        <textarea className="w-full p-2.5 mb-16 text-sm rounded-md border-1 resize-none border-primary1 placeholder-gray-400 focus:border-primary1 focus:outline-3 focus:outline-secondary1 focus:outline-offset-2" rows={4} name="dedication" id="dedication" onChange={handleTextChange} value={dedicationMsg} placeholder="Please enter your dedication / requests here (Maximum of 200 Characters)" maxLength={200}></textarea>
                        <div className="flex justify-end">
                          <Button icon={CartIcon} text={"Add to Cart"} type="primary" clickFunction={() => {
                            const cartItem = {
                              id: product.id,
                              name: product.name,
                              flavor: selectedFlavor,
                              size: selectedSize,
                              dedication: dedicationMsg,
                              price: product.price,
                              image: product.image
                            }
                            addToCart(cartItem)
                            alert("Added to cart!")
                          }}/>
                        </div>
                        
                        
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductPage