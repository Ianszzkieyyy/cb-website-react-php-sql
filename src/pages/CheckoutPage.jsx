import React from "react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

import Navbar from "../components/Navbar";

const CheckoutPage = () => {
    const { cartItems } = useCart()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
            </div>

        </div>
    );
}

export default CheckoutPage;