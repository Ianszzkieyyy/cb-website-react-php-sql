import React, {useEffect, useState} from "react";

import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import Button from "../components/Button";


const CartPage = () => {
    const [totalPrice, setTotalPrice] = useState(0)

    const { cartItems, clearCart } = useCart()
    const navigate = useNavigate()
 
    const handleGoBack = () => {
        navigate(-1); 
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }
    , [cartItems]);

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="my-8 mx-32 rounded-2xl px-8 py-8 bg-white shadow-md">
                    <div className="flex justify-between items-end">
                        <h1 className="font-domine font-bold text-2xl">My Cart ({cartItems.length})</h1>
                        <button onClick={clearCart} className="text-sm underline text-primary1 hover:text-primary1-darker cursor-pointer transition-all mr-4">Clear All</button>
                    </div>
                    <div className="h-0.5 bg-gray-200 my-4"></div>
                    
                    {cartItems.map(item => (
                        <CartItem item={item}/>
                    ))}
                    {cartItems.length > 0 && 
                    <div className="flex justify-end items-end gap-4 font-semibold">
                        <div className=" text-gray-300 text-sm">Total: <span className="text-lg text-textdark">₱{totalPrice}</span></div>
                        <Link to={"/checkout"}>
                            <Button text={"Proceed to Checkout"} type="accent"/>
                        </Link>
                    </div>}
                    
                </div>
            </div>
        </div>
    )

}

export default CartPage