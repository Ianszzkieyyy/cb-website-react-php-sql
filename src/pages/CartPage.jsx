import React from "react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";

const CartPage = () => {
    const { cartItems, cleanCart } = useCart()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="my-8 mx-32 rounded-2xl px-8 py-8 bg-white shadow-md">
                    <h1 className="font-domine font-bold text-2xl">My Cart ({cartItems.length})</h1>
                    <div className="h-0.5 bg-gray-200 my-4"></div>
                    {cartItems.map(item => (
                        <CartItem item={item}/>
                    ))}
                </div>
            </div>
            
        </div>
    )

}

export default CartPage