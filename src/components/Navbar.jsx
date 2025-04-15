import React from "react"
import { Link } from "react-router-dom"

import { useCart } from "./context/CartContext"

import LogoIcon from "../assets/logos/icon_logo_pink.svg?react"
import ShoppingCart from "../assets/icons/shopping-cart.svg?react"


const Navbar = () => {
    const { cartItems } = useCart()

    return (
        <nav className="flex items-center justify-between px-32 py-8 shadow-xs bg-bglight "> 
            <LogoIcon className="w-6 h-6 text-primary1 fill-current"/>

            <div className="hidden md:flex items-center justify-center space-x-20 text-sm text-primary1 font-semibold font-inter">
                <Link to={"/"}>Home</Link>
                <Link to={"/gallery"}>Gallery</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/about-us"}>About Us</Link>
                <Link to={"/contact"}>Contact</Link>
            </div>

            <div className="relative">
                <Link to={"/cart"}>
                    <ShoppingCart className="w-6 h-6 text-primary1 stroke-current cursor-pointer"/>
                </Link>
                {cartItems.length > 0 && <div className="w-4 bg-red-400 font-inter text-white text-xs rounded-full absolute -top-2 -right-2 text-center">{cartItems.length}</div>}
            </div>

            
        </nav>
    )


}

export default Navbar