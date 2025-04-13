import React from "react";

import IconRating from "../assets/logos/icon_logo_pink.svg?react"
import ShoppingCart from "../assets/icons/shopping-cart.svg?react"
import Button from "./Button";

const ProductCard = ({name, price, rating, img}) => {

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
                    <h3 className="text-md font-semibold">PHP {price}</h3>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <IconRating className="h-5"/>
                        <h3 className="text-sm font-semibold">{rating}</h3>
                    </div>
                    <Button type="primary" shape="square" text={"Add to Cart"} icon={ShoppingCart} size="small"/>
                </div>
            </div>



        </div>
    )

}

export default ProductCard