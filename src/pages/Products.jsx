import React, {useState} from "react";

import ProductHeaderImg from "../assets/images/product_header_img.png"
import Button from "../components/Button";
import SearchFilters from "../components/SearchFilters";

// for testing purposes
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";

const ProductsPage = () => {
    const [activeFilters, setActiveFilters] = useState({
        categories: null,
        sizes: null,
        minPrice: null,
        maxPrice: null,
    })

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
    };

    return (
        <div>
            <Navbar />
            <div className="mx-32">
                <div className="mt-16 bg-accent3 flex flex-row w-full h-auto">
                    <div className="flex-grow p-16 flex flex-col justify-center">
                        <h1 className="font-domine font-bold text-textdark text-4xl mb-4 ">Perfectly Sweet, Undeniably Creative</h1>
                        <p className="w-2xl font-inter mb-8">Browse through our collection of sweets and pastries, whether it be for your next unforgettable celebration, or for those cravings you cannot resist.</p>
                        <div className="flex gap-4">
                            <Button text={"Customize your Cake"} type="primary" shape="square"/>
                            <Button text={"Browse our Collection"} type="secondary" shape="square"/>
                        </div>
                    </div>
                    <div className="overflow-hidden relative w-2/5">
                        <img
                            src={ProductHeaderImg}
                            alt=""
                            className="absolute h-[160%] w-full object-cover object-center drop-shadow-xl -rotate-26"
                        />
                    </div>
                </div>

                <div className="mt-12 flex gap-16">
                    <SearchFilters onFilterChange={handleFilterChange}/>
                    <div className="w-0.25 bg-textdark opacity-15"></div>
                    <div>
                        <h2 className="font-domine font-bold text-xl mb-8">Products</h2>
                        <div className="flex gap-20 mb-16 items-center">
                            <h3 className="text-md font-medium">Sort By</h3>
                            <div className="flex gap-2">
                                <Button text={"Most Popular"} size="small" shape="pill" type="secondary"/>
                                <Button text={"Highest Rated"} size="small" shape="pill" type="secondary"/>
                                <Button text={"Price (High to Low)"} size="small" shape="pill" type="secondary"/>
                                <Button text={"Price (Low to High)"} size="small" shape="pill" type="secondary"/>
                            </div>
                        </div>
                        {/* Card Logic will go here */}
                        <ProductGrid activeFilters={activeFilters}/>
                    </div>
                </div>

            </div>
        </div>

    )

}

export default ProductsPage