import React from "react";

import { useCart } from "./context/CartContext";

import Button from "./Button";

import TrashIcon from "../assets/icons/trash.svg?react"

const CartItem = ({item}) => {
    const { removeFromCart } = useCart()

    return (
        <div className="flex gap-12 mb-6">
            <div className="bg-gray-100 flex justify-center overflow-hidden h-24 p-2 rounded-lg">
                <img 
                    src={item.image} 
                    className="object-contain"
                    alt="" 
                />
            </div>
            <div className="py-4">
                <h2 className="font-semibold mb-1">{item.name}</h2>
                <div className="flex gap-6 text-sm mb-2">
                    <h3><span className="text-gray-300">Size:</span> {item.size} </h3>
                    <h3><span className="text-gray-300">Flavor: </span>{item.flavor} </h3>
                    <h3><span className="text-gray-300">Quantity: </span>{item.quantity} </h3>
                </div>
                <div className="w-md break-words">
                    <div className="text-sm text-gray-300 mb-1">Dedication: </div>
                    <div className="text-xs italic">"{item.dedication}"</div>
                </div>
            </div>
            <div className="py-4 flex-1 justify-self-end">
                <div className="font-semibold mb-2 text-2xl text-end">
                    <span className="text-gray-300 text-sm mr-2">Total:</span>
                    ₱{item.price}
                </div>
                <div className="flex justify-end">
                    <Button text={"Remove"} size="small" type="outline" icon={TrashIcon} clickFunction={() => removeFromCart(item.id)}/>
                </div>
                
            </div>

        </div>
    )
}

export default CartItem