import React, {useState, useEffect} from "react";
import { useCart } from "./context/CartContext";
import Button from "./Button";
import RadioButton from "./RadioButton";
import DatePicker from "./DatePicker";

const dayAfterTomorrow = new Date()
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

const CustomCakeDialog = ({toggleDialog, setShowSuccess }) => {
    const [cakeName, setCakeName] = useState('')
    const [calculatedPrice, setCalculatedPrice] = useState(300)
    const [selectedSize, setSelectedSize] = useState('4x2')
    const [selectedFlavor, setSelectedFlavor] = useState("Moist Choco")
    const [dedicationMsg, setDedicationMsg] = useState("")
    const [date, setDate] = useState(dayAfterTomorrow)
    const [quantity, setQuantity] = useState(1)
    const [inspirationImage, setInspirationImage] = useState(null)
    const [errors, setErrors] = useState({})

    const { addToCart } = useCart()


    const handleTextChange = (e, setter) => {
        setter(e.target.value)
    }

    const increment = (e) => {
        e.preventDefault()
        if (quantity < 3) setQuantity(quantity + 1); 
    };
    
    const decrement = (e) => {
        e.preventDefault()
        if (quantity > 1) setQuantity(quantity - 1); 
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, image: "Only JPG or PNG files are allowed." }));
            setInspirationImage(null);
        } else {
            setErrors(prev => ({ ...prev, image: null }));
            setInspirationImage(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!cakeName.trim()) newErrors.cakeName = "Cake name is required.";
        if (!inspirationImage) newErrors.image = "Please upload an inspiration image.";
        if (dedicationMsg.length > 200) newErrors.dedication = "Dedication message must be under 200 characters.";
        if (!date || date < dayAfterTomorrow) newErrors.date = "Invalid pickup date.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let uploadedImageUrl = "";
            if (inspirationImage) {
                const formData = new FormData();
                formData.append("image", inspirationImage); // File from input
    
                const response = await fetch("http://localhost/cakes_bakes_backend/upload.php", {
                    method: "POST",
                    body: formData,
                });
    
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Image upload failed");
                }
    
                uploadedImageUrl = data.imageUrl;
            }
    
            const customProduct = {
                cartItemId: crypto.randomUUID(),
                name: cakeName,
                price: calculatedPrice * quantity,
                size: selectedSize,
                flavor: selectedFlavor,
                category: "custom",
                dedication: dedicationMsg,
                deliveryDate: date,
                quantity: quantity,
                image: uploadedImageUrl, 
            };

            if (validateForm()) {
                addToCart(customProduct);
                setShowSuccess(true);
                toggleDialog();
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000)
            }

        } catch (error) {
            console.error("Submission error:", error);
        }
    };
    

    const sizes = ["4x2", "5x3", "6x4", "7x4", "8x4", "Two Tier"]
    const flavors = ['Moist Choco', 'Mocha Chiffon', 'Vanilla Chiffon', 'Strawberry Chiffon']
    const sizesPriceMap = {
        '4x2': 300,
        '5x3': 600,
        '6x4': 1000,
        '7x4': 1500,
        '8x4': 2000,
        'Two Tier': 2500
    }

    useEffect(() => {
        const newPrice = sizesPriceMap[selectedSize];
        if (newPrice) {
            setCalculatedPrice(newPrice);
        }
    }, [selectedSize]);

    return (
        <div className="font-inter mx-4">
            <h1 className="font-domine font-bold text-xl">Customize a Cake</h1>
            <div className="h-[1.5px] bg-gray-200 my-4 w-full"></div>
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="flex justify-between items-start gap-10">
                    <div className="flex-1">
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="text-sm" htmlFor="name">Enter your cake name</label>
                            <input className="border border-primary1/30 rounded-md px-2 py-1 w-full" type="text" id="name" maxLength={50} onChange={(e) => handleTextChange(e, setCakeName)} />
                            {errors.cakeName && <p className="text-red-500 text-sm mt-1">{errors.cakeName}</p>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="text-sm" htmlFor="size">Select your cake size</label>
                            <div className="text-sm flex flex-wrap flex-grow gap-2">
                                {sizes.map((size) => (
                                    <RadioButton key={size} label={size} value={size} selectedValue={selectedSize} onChange={setSelectedSize} name="size" size="min-w-16"/>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="text-sm" htmlFor="flavor">Select your cake flavor</label>
                            <div className="text-sm flex flex-wrap gap-2">
                                {flavors.map((flavor) => (
                                    <RadioButton key={flavor} label={flavor} value={flavor} selectedValue={selectedFlavor} onChange={setSelectedFlavor} name="flavor"/>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Quantity <span className="text-xs italic text-gray-500">Max of 3 Items per order</span></p>
                            <div className="items-center gap-2 mb-2 border-1 border-primary1 inline-flex rounded-full p-1">
                              <button
                                onClick={(e) => decrement(e)}
                                className="w-8 h-8 text-md rounded-full bg-bglight hover:bg-accent2 active:bg-primary1  transition-all"
                              >
                                -
                              </button>
                              <span className="text-lg font-medium w-10 text-center">{quantity}</span>
                              <button
                                onClick={(e) => increment(e)}
                                className="w-8 h-8 text-md rounded-full bg-bglight hover:bg-accent2 active:bg-primary1 transition-all"
                              >
                                +
                              </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-2 mb-4 text-sm">
                            <label htmlFor="dedication">Enter your dedication message</label>
                            <textarea className="border border-primary1/30 rounded-xl py-2 px-4 h-44 resize-none" placeholder="Enter your requests, dedications, and customizations here. (Max of 200 Characters)" id="dedication" maxLength={200} onChange={(e) => handleTextChange(e, setDedicationMsg)} />
                            {errors.dedication && <p className="text-red-500 text-sm mt-1">{errors.dedication}</p>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4 text-sm">
                            <label htmlFor="image">Upload an inspiration image</label>
                            <input className="text-md border-2 border-primary1/30 rounded-lg py-2 px-4" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="date">Select your pickup date</label>
                            <div>
                                <DatePicker date={date} setDate={setDate} dayAfterTomorrow={dayAfterTomorrow }/>
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-start mt-8">
                    <div className="flex text-xs flex-3 text-gray-500 text-justify items-center gap-2 mt-1">
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                        <p>The initial estimated prices are based on calculations of your selected cake size and quantity. Final price may vary depending on design. All custom orders are subject to review before confirmation. You will receive an email shortly after placing this order for further instruction.</p>
                    </div>
                    <div className="flex flex-2 flex-col gap-2 items-end">
                        <p className="text-sm text-gray-500">Initial Estimated Price: <span className="font-bold text-textdark text-lg">₱{calculatedPrice * quantity}</span></p>
                        <Button text={"Add to Cart"} type="primary" shape="square" clickFunction={handleSubmit}/>
                    </div>       
                </div>
                
            </form>
        </div>
    )
}

export default CustomCakeDialog