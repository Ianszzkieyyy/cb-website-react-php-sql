import React from "react"
import LogoIcon from "../assets/logos/icon_logo_pink.svg?react"
import ShoppingCart from "../assets/icons/shopping-cart.svg?react"

const Navbar = () => {

    return (
        <nav className="flex items-center justify-between px-32 py-8 shadow-xs bg-bglight "> 
            <LogoIcon className="w-6 h-6 text-primary1 fill-current"/>

            <div className="hidden md:flex items-center justify-center space-x-20 text-sm text-primary1 font-semibold font-inter">
                <a href="#" >Home</a>
                <a href="#" >Gallery</a>
                <a href="#" >Products</a>
                <a href="#" >About Us</a>
                <a href="#" >Contact</a>
            </div>

            <div>
                <button >
                    <ShoppingCart className="w-6 h-6 text-primary1 stroke-current cursor-pointer"/>
                </button>

            </div>

            
        </nav>
    )


}

export default Navbar