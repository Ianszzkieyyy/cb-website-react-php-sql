import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "../components/context/CartContext";

import Navbar from "../components/Navbar";
import MiniCartItem from "../components/MiniCartItem";

const CheckoutPage = () => {
    const { cartItems } = useCart()
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate()

    const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0)
    const downPayment = subTotal * 0.3

    const [selectedMethod, setSelectedMethod] = useState("delivery")

    const handleGoBack = () => {
        navigate(-1); 
    };

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="my-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex">

                    <div className="flex-2 p-16 bg-white rounded-2xl border-primary1/30 border-2">
                        <h1 className="font-inter font-semibold text-2xl">Checkout</h1>
                        <div className="h-0.5 bg-gray-200 my-4 w-full"></div>
                        <div className="flex flex-col gap-8 w-full">
                            <div className="flex flex-col gap-2 w-full mt-4">
                                <label htmlFor="name" className="text-sm font-semibold">Full Name *</label>
                                <input {...register("name", {
                                    required: true,
                                    pattern: /^[a-zA-Z][a-zA-Z ]{3,}[a-zA-Z]$/,
                                    maxLength: 50,
                                })} type="text" id="name" placeholder="Enter your full name" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary1" />
                                {errors.name && <span className="text-red-500 text-sm">Please enter a valid name</span>}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="email" className="text-sm font-semibold">Email Address *</label>
                                <input {...register("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    maxLength: 50,
                                })} type="email" id="email" placeholder="Enter your email address" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary1" />
                                {errors.email && <span className="text-red-500 text-sm">Please enter a valid email address</span>}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="address" className="text-sm font-semibold">Shipping Address *</label>
                                <input {...register("address", {
                                    required: true,
                                    maxLength: 100,
                                })} type="text" id="address" placeholder="Enter your shipping address" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary1" />
                                {errors.address && <span className="text-red-500 text-sm">Please enter a valid address</span>}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="phone" className="text-sm font-semibold">Phone Number *</label>
                                <input {...register("phone", {
                                    required: true,
                                    pattern: /^(?:\+63|0)\s?9\d{2}\s?\d{3}\s?\d{4}$/
                                })} type="tel" id="phone" placeholder="Enter your phone number" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary1" />
                                {errors.phone && <span className="text-red-500 text-sm">Please enter a valid (+63 or 09) phone number</span>}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="fb" className="text-sm font-semibold">Facebook (Optional)</label>
                                <input {...register("fb", {
                                    pattern: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}$/,
                                    maxLength: 100,
                                })} type="text" id="fb" placeholder="Enter your Facebook profile link" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary1" />
                                {errors.fb && <span className="text-red-500 text-sm">Please enter a valid facebook link</span>}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="method" className="text-sm font-semibold">Select Method</label>
                                <div className="flex gap-4 mb-4">
                                    <label key="delivery" className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedMethod === "delivery" ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                        <input {...register("method")} type="radio" name="method" value="delivery" className="sr-only" checked={selectedMethod === "delivery"} onChange={() => setSelectedMethod("delivery")} />Delivery
                                    </label>
                                    <label key="pickup" className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border ${selectedMethod === "pickup" ? 'bg-primary1 text-white outline-primary1 outline-offset-1 outline-1' : 'bg-bglight text-primary1 border-primary1'} transition-all `}>
                                        <input {...register("method")} type="radio" name="method" value="pickup" className="sr-only" checked={selectedMethod === "pickup"} onChange={() => setSelectedMethod("pickup")} />Pick-up
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex-1 py-12 px-8 bg-white rounded-2xl border-primary1/30 border-2 ml-8">
                        <h1 className="font-inter font-semibold text-md">Summary</h1>
                        <div className="h-0.5 bg-gray-200 my-4 w-full"></div>
                        <div className="flex flex-col w-full h-1/2 overflow-y-auto overflow-x-hidden custom-scrollbar">   
                            {cartItems.map(item => (
                                <MiniCartItem item={item} key={item.cartItemId}/>
                            ))}
                        </div>
                        <div className="h-0.5 bg-gray-200 my-4 w-full"></div>
                        <h1 className="font-inter font-semibold text-md">Details</h1>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex justify-between items-end text-sm font-semibold">
                                <h3 className="text-gray-300">Subtotal:</h3>
                                <h3 className="text-lg">₱{subTotal}</h3>
                            </div>
                            <div className="flex justify-between items-center text-sm font-semibold">
                                <h3 className="text-gray-300">30% Downpayment:</h3>
                                <h3 className="text-lg">₱{downPayment}</h3>
                            </div>
                            <div className="flex justify-between items-center text-sm font-semibold">
                                <h3 className="text-gray-300">Delivery Date(s):</h3>
                                {cartItems.map(item => {
                                    const date = new Date(item.deliveryDate);
                                    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                                    return <h3 className="text-xs">{formattedDate}</h3>;
                                })}
                            </div>
                        </div>

                        <button type="submit" className="bg-accent1 text-white py-2 px-4 rounded-full w-full hover:bg-accent1-darker transition duration-250 ease-in-out">Proceed to Payment</button>
                    </div>
                </form>
                </div>
                
            </div>

        </div>
    )
}

export default CheckoutPage;