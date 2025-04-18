import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { useCart } from "./context/CartContext"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import MiniCartItem from "./MiniCartItem"
import Button from "./Button"

import LogoIcon from "../assets/logos/icon_logo_pink.svg?react"
import ShoppingCart from "../assets/icons/shopping-cart.svg?react"


const Navbar = () => {
    const { cartItems } = useCart()
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between px-32 py-6 shadow-xs bg-bglight "> 
            <LogoIcon className="w-6 h-6 text-primary1 fill-current"/>

            <div className="hidden md:flex items-center justify-center space-x-20 text-sm text-primary1 font-semibold font-inter">
                <Link to={"/"}>Home</Link>
                <Link to={"/gallery"}>Gallery</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/about-us"}>About Us</Link>
                <Link to={"/contact"}>Contact</Link>
            </div>

            <HoverCard className="relative">
                <HoverCardTrigger>
                    <div className="relative">
                        <Link to={"/cart"}>
                            <ShoppingCart className="w-6 h-6 text-primary1 stroke-current cursor-pointer"/>
                        </Link>
                        {cartItems.length > 0 && <div className="w-4 bg-red-400 font-inter text-white text-xs rounded-full absolute -top-2 -right-2 text-center">{cartItems.length}</div>}
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="absolute w-80 -right-10 rounded-lg bg-bglight shadow-none border-2 border-primary1/30">
                    <div className="flex flex-col gap-4">
                        {cartItems.map(item => (
                            <div className="bg-white px-4 py-2 rounded-md">
                                <MiniCartItem item={item} key={item.cartItemId}/>
                            </div>
                        ))}
                        <Button text={"View Cart"} size="small" type="primary" shape="square" className="w-full" clickFunction={() => navigate("/cart")}/>
    
                    </div>
                </HoverCardContent>
            </HoverCard>
            

            
        </nav>
    )


}

export default Navbar