import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const SearchFilters = ({ onFilterChange }) => {
    const [searchParams] = useSearchParams();
    
    // Initialize state from URL parameters
    const [selectedCategories, setSelectedCategories] = useState(() => {
        const categoriesParam = searchParams.get('categories');
        return categoriesParam ? categoriesParam.split(',') : [];
    });
    
    const [selectedSizes, setSelectedSizes] = useState(() => {
        const sizesParam = searchParams.get('sizes');
        return sizesParam ? sizesParam.split(',') : [];
    });
    
    const [minPrice, setMinPrice] = useState(() => searchParams.get('minPrice') || "");
    const [maxPrice, setMaxPrice] = useState(() => searchParams.get('maxPrice') || "");

    // Apply filters from URL on component mount
    useEffect(() => {
        if (selectedCategories.length > 0 || selectedSizes.length > 0 || minPrice || maxPrice) {
            applyFilters();
        }
    }, []);

    // Categories with their display and value properties
    const categories = [
        { display: "Signature Cakes", value: "signature" },
        { display: "Dedication Cakes", value: "dedication" },
        { display: "Artistic Cakes", value: "artistic" },
        { display: "Bento Cakes", value: "bento" },
        { display: "One-Tier Cakes", value: "one_tier" },
        { display: "Two-Tier Cakes", value: "two_tier" },
        { display: "Number Cakes", value: "number" },
        { display: "Brownies", value: "brownies" },
        { display: "Cupcakes", value: "cupcakes" },
        { display: "Muffins", value: "muffins" },
        { display: "Packages", value: "packages" }
    ];

    // Sizes available
    const sizes = ["4x2", "5x3", "6x4", "7x4", "8x4"];

    const handleCategoryChange = (categoryValue, isChecked) => {
        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryValue]);
        } else {
            setSelectedCategories(selectedCategories.filter(value => value !== categoryValue));
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
        window.scrollTo(0, 300)
    };

    const removeFilters = () => {
        setSelectedCategories([])
        setSelectedSizes([])
        setMinPrice("")
        setMaxPrice("")

        onFilterChange({
            categories: null,
            sizes: null,
            minPrice: null,
            maxPrice: null
        })
        window.scrollTo(0, 300)
    }

    return (
        <div>
            <div className="font-inter text-textdark">
                <h2 className="font-domine font-bold text-xl mb-8">Search Filter</h2>

                <h3 className="text-md mb-4 font-medium">By Category</h3>
                {categories.map(category => (
                    <Checkbox 
                        key={category.value}
                        id={category.display} 
                        checked={selectedCategories.includes(category.value)} 
                        onChange={(e) => handleCategoryChange(category.value, e.target.checked)} 
                    />
                ))}

                <h3 className="text-md mt-6 mb-4 font-medium">By Size</h3>
                {sizes.map(size => (
                    <Checkbox 
                        key={size}
                        id={size} 
                        checked={selectedSizes.includes(size)} 
                        onChange={(e) => handleSizeChange(size, e.target.checked)} 
                    />
                ))}

                <h3 className="text-md mt-6 mb-4 font-medium">By Price Range (PHP)</h3>
                <label htmlFor="min-price" className="block mb-2 text-sm font-inter font-medium text-textdark">Minimum</label>
                <input type="number" name="min-price" id="min-price" placeholder="300" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="block mb-4 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />

                <label htmlFor="max-price" className="block mb-2 text-sm font-inter font-medium text-textdark">Maximum</label>
                <input type="number" name="max-price" id="max-price" placeholder="5999" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="block mb-8 font-inter w-full p-2 text-textdarker border border-gray-300 rounded-lg bg-bglight text-xs" />

                <div className="flex flex-col gap-4">
                    <Button text={"Apply Filters"} type="primary" shape="square" clickFunction={applyFilters}/>
                    <Button text={"Clear Filters"} type="outline" shape="square" clickFunction={removeFilters}/>
                </div>

            </div>
        </div>
    );
};

export default SearchFilters;