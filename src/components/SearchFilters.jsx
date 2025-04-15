import React, {useState} from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";

const SearchFilters = ({ onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const categoryMapping = {
        "Signature Cakes": "signature",
        "Dedication Cakes": "dedication",
        "Artistic Cakes": "artistic",
        "Bento Cakes": "bento",
        "One-Tier Cakes": "one_tier",
        "Two-Tier Cakes": "two_tier",
        "Number Cakes": "number",
        "Brownies": "brownies",
        "Cupcakes": "cupcakes",
        "Muffins": "muffins",
        "Packages": "packages"
    };

    const handleCategoryChange = (displayName, isChecked) => {
        const databaseValue = categoryMapping[displayName];

        if (isChecked) {
            setSelectedCategories([...selectedCategories, databaseValue]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== databaseValue));
        }
    };

    const handleSizeChange = (sizeId, isChecked) => {
        if (isChecked) {
            setSelectedSizes([...selectedSizes, sizeId]);
        } else {
            setSelectedSizes(selectedSizes.filter(id => id !== sizeId));
        }
    };

    const applyFilters = () => {
        const filters = {
            categories: selectedCategories.length > 0 ? selectedCategories : null,
            sizes: selectedSizes.length > 0 ? selectedSizes : null,
            minPrice: minPrice !== "" ? parseFloat(minPrice) : null,
            maxPrice: maxPrice !== "" ? parseFloat(maxPrice) : null
        };
        
        onFilterChange(filters);
    };

    return (
        <div>
            <div className="font-inter text-textdark">
                    <h2 className="font-domine font-bold text-xl mb-8">Search Filter</h2>

                    <h3 className="text-md mb-4 font-medium">By Category</h3>
                    <Checkbox id="Signature Cakes" onChange={(e) => handleCategoryChange("Signature Cakes", e.target.checked)} />
                    <Checkbox id="Dedication Cakes" onChange={(e) => handleCategoryChange("Dedication Cakes", e.target.checked)} />
                    <Checkbox id="Artistic Cakes" onChange={(e) => handleCategoryChange("Artistic Cakes", e.target.checked)}/>
                    <Checkbox id="Bento Cakes" onChange={(e) => handleCategoryChange("Bento Cakes", e.target.checked)} />
                    <Checkbox id="One-Tier Cakes" onChange={(e) => handleCategoryChange("One-Tier Cakes", e.target.checked)} />
                    <Checkbox id="Two-Tier Cakes" onChange={(e) => handleCategoryChange("Two-Tier Cakes", e.target.checked)} />
                    <Checkbox id="Number Cakes" onChange={(e) => handleCategoryChange("Number Cakes", e.target.checked)} />
                    <Checkbox id="Brownies" onChange={(e) => handleCategoryChange("Brownies", e.target.checked)} />
                    <Checkbox id="Cupcakes" onChange={(e) => handleCategoryChange("Cupcakes", e.target.checked)} />
                    <Checkbox id="Muffins" onChange={(e) => handleCategoryChange("Muffins", e.target.checked)} />
                    <Checkbox id="Packages" onChange={(e) => handleCategoryChange("Packages", e.target.checked)} />

                    <h3 className="text-md mt-6 mb-4 font-medium">By Size</h3>
                    <Checkbox id="4x2" onChange={(e) => handleSizeChange("4x2", e.target.checked)} />
                    <Checkbox id="5x3" onChange={(e) => handleSizeChange("5x3", e.target.checked)} />
                    <Checkbox id="6x4" onChange={(e) => handleSizeChange("6x4", e.target.checked)} />
                    <Checkbox id="7x4" onChange={(e) => handleSizeChange("7x4", e.target.checked)} />
                    <Checkbox id="8x4" onChange={(e) => handleSizeChange("8x4", e.target.checked)} />

                    <h3 className="text-md mt-6 mb-4 font-medium">By Price Range (PHP)</h3>
                    <label for="min-price" class="block mb-2 text-sm font-inter font-medium text-textdark ">Minimum</label>
                    <input type="number" name="min-price" id="min-price" placeholder="300" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="block mb-4 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />

                    <label for="max-price" class="block mb-2 text-sm font-inter font-medium text-textdark ">Minimum</label>
                    <input type="number" name="max-price" id="max-price" placeholder="5999" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="block mb-8 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />
                    <Button text={"Apply Filters"} type="primary" shape="square" clickFunction={applyFilters}/>
                </div>
        </div>
    )


}

export default SearchFilters;