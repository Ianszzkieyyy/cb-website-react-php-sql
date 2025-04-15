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
    const [showSuccess, setShowSuccess] = useState(false)

    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [selectedSize, setSelectedSize] = useState("4x2")
    const [selectedFlavor, setSelectedFlavor] = useState("Moist Choco")
    const [dedicationMsg, setDedicationMsg] = useState("")
    const [quantity, setQuantity] = useState(1)

    const { addToCart } = useCart()

    useEffect(() => {
        const fetchCakeDetails = async() => {
            try {
                setLoading(true)
                const response = await fetch(`http://localhost/cakes_bakes_backend/products/${id}`)

                if (!response.ok) {
                    throw new Error('failed to fetch product details')
                }

                const data = await response.json()

                const transformedProduct = {
                    id: data.product_id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    rating: data.rating,
                    image: `http://localhost/cakes_bakes_backend/uploads/images/${data.image_url}`,
                    category: data.category,
                    flavors: ["Moist Choco", "Mocha Chiffon", "Vanilla Chiffon", "Strawberry Chiffon"],
                    sizes: data.size,
                }

                setProduct(transformedProduct)
                setSelectedSize(transformedProduct.sizes[0])
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

    const handleShowAdded = () => {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }



    const calculatePrice = (basePrice, selectedSize, allSizes) => {
      const sizeIndex = allSizes.indexOf(selectedSize)
      const priceModifier = 1 + (sizeIndex * 0.3)
      return (basePrice * priceModifier).toFixed(2)
    }

    useEffect(() => {
      if (product && product.price) {
        const updatedPrice = calculatePrice(product.price, selectedSize, product.sizes);
        setCalculatedPrice(updatedPrice);
      }
    }, [selectedSize, product]);

    const handleTextChange = (e) => {
      setDedicationMsg(e.target.value)
    }

    const increment = () => {
      if (quantity < 3) setQuantity(prev => prev + 1); 
    };
  
    const decrement = () => {
      if (quantity > 1) setQuantity(prev => prev - 1); 
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
            <div className="mx-32 my-8 font-inter text-textdark">
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  showSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center p-4 text-sm text-white rounded-lg bg-accent1 shadow-lg">
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Success!</span> Your item was added to the cart.
                  </div>
                </div>
              </div>
            </div>

                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="flex gap-20 p-16">
                    <div className="sticky top-20 self-start w-96 h-96 flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <img src={product.image} className="object-cover w-full h-full " alt=""/>
                    </div>
                    <div>
                        <h1 className="font-domine font-bold text-4xl mb-4">{product.name}</h1>
                        <div className="flex gap-4 mb-8"> <DisplayRating rating={product.rating}/> {product.rating} Stars</div>
                        <div className="flex gap-2 mb-12 overflow-auto">
                            {product.category.map(category => (
                                <Button text={category} size="small" type="accent" />
                            ))}
                        </div>

                        <h1 className="font-domine font-bold text-4xl mb-12 text-primary1">₱ {calculatedPrice || product.price}</h1>

                        <p className="text-lg mb-12">{product.description}</p>

                        <h3 className="font-semibold text-md mb-4">Size</h3>
                        <div className="mb-12 flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <label key={size} className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedSize === size ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                    <input type="radio" name="size" value={size} className="sr-only" checked={selectedSize === size} onChange={() => setSelectedSize(size)} />{size}
                                </label>
                            ))}
                        </div>

                        <h3 className="font-semibold text-md mb-4">Flavor</h3>
                        <div className="mb-12 flex flex-wrap gap-3">
                            {product.flavors.map((flavor) => (
                                <label key={flavor} className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedFlavor === flavor ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                    <input type="radio" name="flavor" value={flavor} className="sr-only" checked={selectedFlavor === flavor} onChange={() => setSelectedFlavor(flavor)} />{flavor}
                                </label>
                            ))}
                        </div>

                        <h3 className="font-semibold text-md mb-4">Quantity</h3>
                        <div className="items-center gap-2 mb-12 border-1 border-primary1 inline-flex rounded-full p-1">
                          <button
                            onClick={decrement}
                            className="w-8 h-8 text-md rounded-full bg-bglight hover:bg-accent2 active:bg-primary1  transition-all"
                          >
                            -
                          </button>
                          <span className="text-lg font-medium w-10 text-center">{quantity}</span>
                          <button
                            onClick={increment}
                            className="w-8 h-8 text-md rounded-full bg-bglight hover:bg-accent2 active:bg-primary1 transition-all"
                          >
                            +
                          </button>
                        </div>
                        
                        <h3 className="font-semibold text-md mb-2">Dedication / Requests</h3>
                        <p className="text-sm mb-4">If you wish to leave it empty, please input N/A. </p>
                        <textarea className="w-full p-2.5 mb-16 text-sm rounded-md border-1 resize-none border-primary1 placeholder-gray-400 focus:border-primary1 focus:outline-3 focus:outline-secondary1 focus:outline-offset-2" rows={4} name="dedication" id="dedication" onChange={handleTextChange} value={dedicationMsg} placeholder="Please enter your dedication / requests here (Maximum of 200 Characters)" maxLength={200}></textarea>
                        <div className="flex justify-end">
                          <Button icon={CartIcon} text={"Add to Cart"} type="primary" clickFunction={() => {
                            const cartItem = {
                              cartItemId: crypto.randomUUID(),
                              id: product.id,
                              name: product.name,
                              flavor: selectedFlavor,
                              size: selectedSize,
                              dedication: dedicationMsg,
                              quantity: quantity,
                              price: parseFloat(calculatedPrice) * quantity,
                              image: product.image
                            }
                            addToCart(cartItem)
                            handleShowAdded()
                          }}/>
                        </div>

                        
                        
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductPage