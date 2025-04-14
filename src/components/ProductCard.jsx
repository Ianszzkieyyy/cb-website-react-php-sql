import React from "react";
import { useNavigate } from "react-router-dom";

import IconRating from "../assets/logos/icon_logo_pink.svg?react"
import ShoppingCart from "../assets/icons/shopping-cart.svg?react"
import Button from "./Button";

const ProductCard = ({product}) => {

    const {id, name, price, rating, img} = product
    const navigate = useNavigate()

    const handleViewProduct = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className="rounded-md overflow-hidden font-inter text-textdark w-64 transition duration-300 ease-in-out hover:shadow-xl hover:shadow-primary1/25 hover:ring-secondary1/50 hover:ring-3">
            <div className="pb-6 flex justify-center overflow-hidden h-48">
                <img
                    src={img}
                    alt=""
                    className="transition-transform duration-300 ease-in-out hover:scale-115 object-contain"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-top mb-4">
                    <h2 className="text-sm w-1/2">{name}</h2>
                    <h3 className="text-md font-semibold">₱{price}</h3>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <IconRating className="h-5 text-primary1"/>
                        <h3 className="text-sm font-semibold">{rating}</h3>
                    </div>
                    <Button clickFunction={handleViewProduct} type="primary" shape="square" text={"View Cake"} icon={ShoppingCart} size="small"/>
                </div>
            </div>



        </div>
    )

}

export default ProductCard