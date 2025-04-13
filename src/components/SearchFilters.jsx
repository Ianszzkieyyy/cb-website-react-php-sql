import React from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";

const SearchFilters = () => {
    return (
        <div>
            <div className="font-inter text-textdark">
                    <h2 className="font-domine font-bold text-xl mb-8">Search Filter</h2>
                    <h3 className="text-md mb-4 font-medium">By Category</h3>
                    <Checkbox id="Signature Cakes"/>
                    <Checkbox id="Dedication Cakes"/>
                    <Checkbox id="Bento Cakes"/>
                    <Checkbox id="One-Tier Cakes"/>
                    <Checkbox id="Two-Tier Cakes"/>
                    <Checkbox id="Number Cakes"/>
                    <Checkbox id="Brownies"/>
                    <Checkbox id="Cupcakes"/>
                    <Checkbox id="Muffins"/>
                    <Checkbox id="Packages"/>
                    <h3 className="text-md mt-6 mb-4 font-medium">By Size</h3>
                    <Checkbox id="4x2"/>
                    <Checkbox id="5x3"/>
                    <Checkbox id="6x4"/>
                    <Checkbox id="7x4"/>
                    <Checkbox id="8x4"/>
                    <h3 className="text-md mt-6 mb-4 font-medium">By Price Range (PHP)</h3>
                    <label for="min-price" class="block mb-2 text-sm font-inter font-medium text-textdark ">Minimum</label>
                    <input type="number" name="min-price" id="min-price" placeholder="300" className="block mb-4 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />
                    <label for="max-price" class="block mb-2 text-sm font-inter font-medium text-textdark ">Minimum</label>
                    <input type="number" name="max-price" id="max-price" placeholder="5999" className="block mb-8 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />
                    <Button text={"Apply Filters"} type="primary" shape="square"/>
                </div>
        </div>
    )


}

export default SearchFilters;