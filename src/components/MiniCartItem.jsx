import React from "react";

const MiniCartItem = ({ item }) => {
    return (
        <div className="font-inter flex gap-4 items-center">
            <div className="bg-gray-100 flex justify-center overflow-hidden h-12 p-2 rounded-lg">
                <img
                    src={item.image}
                    className="object-contain"
                    alt=""
                />
            </div>
            <div className="">
                <h2 className="font-semibold text-sm mb-1">{item.name}</h2>
                <div className="flex gap-6 text-xs mb-2">
                    <h3><span className="text-gray-300">Quantity: </span>{item.quantity} </h3>
                    <h3 className="font-semibold"><span className="font-normal text-gray-300">Price: </span>₱{item.price} </h3>
                </div>
            </div>
        </div>
    );
}

export default MiniCartItem