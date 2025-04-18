import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useCart } from "../components/context/CartContext"

import Navbar from "../components/Navbar"
import MiniCartItem from "../components/MiniCartItem"
import { Progress } from "@/components/ui/progress"

import GCashIcon from "../assets/icons/gcash.svg?react"
import GCashQR from "../assets/images/gcash_qr.png"

const CheckoutPage = () => {
    const { cartItems } = useCart()
    const { register, handleSubmit, setError, setValue, watch, clearErrors, formState: {errors, dirtyFields} } = useForm()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0)
    const downPayment = subTotal * 0.3

    const [selectedMethod, setSelectedMethod] = useState("delivery")

    const totalFields = 4
    const validFields = [
        dirtyFields.name && !errors.name,
        dirtyFields.email && !errors.email,
        dirtyFields.address && !errors.address,
        dirtyFields.phone && !errors.phone,
    ].filter(Boolean).length;

    const progress = (validFields / totalFields) * 100;

    const uniqueDates = []

    cartItems.forEach(item => {
        const date = new Date(item.deliveryDate);
        const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
        if (!uniqueDates.includes(formattedDate)) {
          uniqueDates.push(formattedDate);
        }
    });

    const handleGoBack = () => {
        navigate(-1)
    };

    const onSubmit = (data) => {
        console.log(data)
    }

    const handleButtonClick = () => {
        fileInputRef.current.click()
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const allowedTypes = ["image/png", "image/jpeg"];   
            if (!allowedTypes.includes(file.type)) {
                setError("qr_receipt", {
                  type: "manual",
                });
                setValue("qr_receipt", null, { shouldValidate: true });
                event.target.value = null;
                return;
            }

            clearErrors("qr_receipt");
            setValue("qr_image", file, { shouldValidate: true })
        }
    };

    const selectedFile = watch("qr_image")

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-8 font-inter text-textdark">
                <button onClick={handleGoBack} className="text-primary1 text-sm underline decoration-solid underline-offset-3 cursor-pointer hover:text-primary1-darker transition duration-250 ease-in-out">{"< Go Back"}</button>
                <div className="my-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex">
                    <div className="relative overflow-hidden flex-2 p-16 bg-white rounded-2xl border-primary1/30 border-2">
                        <Progress value={progress} className="absolute top-0 left-0 h-1 rounded-full" />
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
                                <label htmlFor="method" className="text-sm font-semibold">Select Delivery Method</label>
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

                    <div className="flex-1 flex-col">
                        <div className="py-6 px-8 bg-white rounded-2xl border-primary1/30 border-2 ml-8 mb-8">
                            <h1 className="font-inter font-semibold text-md">Summary</h1>
                            <div className="h-[1.5px] bg-gray-200 my-4 w-full"></div>
                            <div className="flex flex-col w-full h-36 gap-6 overflow-y-auto overflow-x-hidden">   
                                {cartItems.map(item => (
                                    <MiniCartItem item={item} key={item.cartItemId}/>
                                ))}
                            </div>
                            <div className="h-[1.5px] bg-gray-200 my-4 w-full"></div>
                            <h1 className="font-inter font-semibold text-md">Details</h1>
                            <div className="flex flex-col gap-2 my-2">
                                <div className="flex justify-between items-start text-sm font-semibold">
                                    <h3 className="text-gray-300">Total:</h3>
                                    <h3>₱{subTotal}</h3>
                                </div>
                                <div className="flex justify-between items-start text-sm font-semibold">
                                    <h3 className="text-gray-300">30% Downpayment:</h3>
                                    <h3>₱{downPayment}</h3>
                                </div>
                                <div className="flex justify-between items-start text-sm font-semibold">
                                    <h3 className="text-gray-300">Delivery Date(s):</h3>
                                    <div className="flex flex-col">
                                        {uniqueDates.map((date, index) => (
                                          <h3 key={index} className="text-xs">{date}</h3>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-8 px-8 bg-white rounded-2xl border-primary1/30 border-2 ml-8">
                            <img src={GCashQR} alt="" className="w-full" />
                            <p className="text-xs text-justify mb-4">All online orders require atleast a 30% downpayment via GCash. Balance + delivery fee (if any) is paid on delivery/pickup. Upload your receipt here.</p>
                            <div>
                                <input type="file" accept="image/png, image/jpg" {...register("qr_image", {
                                    required: true
                                })} 
                                ref={(e) => {
                                    register("qr_image")
                                    fileInputRef.current = e
                                }}
                                onChange={handleFileChange}
                                className="hidden"
                                />
                                <button type="button" onClick={handleButtonClick} className="bg-primary1 text-sm font-medium text-white py-2 px-4 rounded-md w-full hover:bg-primary1-darker transition duration-250 ease-in-out flex gap-2 flex-row justify-center items-center cursor-pointer">
                                    <GCashIcon className="h-4"/>
                                    Upload GCash Receipt
                                </button>
                                {selectedFile && (
                                  <p className="text-sm text-primary1-darker mt-2">Selected: {selectedFile.name}</p>
                                )}
                                {errors.qr_image && <span className="text-red-500 text-sm">Please select an image file</span>}
                                <button type="submit" className="bg-accent1 mt-2 text-sm font-medium text-white py-2 px-4 rounded-md w-full hover:bg-accent1-darker transition duration-250 ease-in-out flex gap-2 flex-row justify-center items-center cursor-pointer">
                                    Submit Order
                                </button>
                            </div>
                        </div>

                        
                        


                    </div>
                </form>
                </div>
                
            </div>

        </div>
    )
}

export default CheckoutPage;