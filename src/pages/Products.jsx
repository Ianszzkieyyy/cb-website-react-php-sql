import React, {useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom"

import ProductHeaderImg from "../assets/images/product_header_img.png"
import Button from "../components/Button"
import Alert from "../components/Alert"
import SearchFilters from "../components/SearchFilters"

import Navbar from "../components/Navbar"
import ProductGrid from "../components/ProductGrid"
import RadioButton from "../components/RadioButton"
import CustomCakeDialog from "@/components/CustomCakeDialog"

import { Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"

import SearchIcon from "../assets/icons/search.svg?react"

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'alphabetical');
    const [showAlert, setShowAlert] = useState(false);

    const [open, setOpen] = useState(false);

    const [activeFilters, setActiveFilters] = useState({
        categories: searchParams.get('categories') ? searchParams.get('categories').split(',') : null,
        sizes: searchParams.get('sizes') ? searchParams.get('sizes').split(',') : null,
        minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : null,
        maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : null,
        search: searchParams.get('search') || '',
        sort: searchParams.get('sort') || 'alphabetical',
    });
    

    useEffect(() => {
        const params = new URLSearchParams();
        
        if (activeFilters.categories) {
            params.set('categories', activeFilters.categories.join(','))
        }
        
        if (activeFilters.sizes) {
            params.set('sizes', activeFilters.sizes.join(','))
        }
        
        if (activeFilters.minPrice) {
            params.set('minPrice', activeFilters.minPrice)
        }
        
        if (activeFilters.maxPrice) {
            params.set('maxPrice', activeFilters.maxPrice)
        }

        if (activeFilters.search) {
            params.set('search', activeFilters.search)
        }
        
        setSearchParams(params);
    }, [activeFilters, setSearchParams])

    const handleFilterChange = (filters, resetSort = false) => {
        if (resetSort) {
            setSelectedSort('alphabetical')
            setActiveFilters({
                ...filters,
                sort: 'alphabetical'
            });
        } else {
            setActiveFilters({
                ...filters,
                sort: activeFilters.sort
            })
        }
    }

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleApplySort = () => {
        setActiveFilters({...activeFilters, sort: selectedSort});
    };

    return (
        <div>
            <Navbar />
            <div className="relative mx-32">
                <Alert className={"fixed w-2/5 top-18 left-1/2 transform -translate-x-1/2 z-50"} showAlert={showAlert} head={"Success!"} infoText={"Your custom cake has been added to the cart."}/>
                <div className="mt-16 bg-accent3 flex flex-row w-full h-auto">
                    <div className="flex-grow p-16 flex flex-col justify-center">
                        <h1 className="font-domine font-bold text-textdark text-4xl mb-4 ">Perfectly Sweet, Undeniably Creative</h1>
                        <p className="w-2xl font-inter mb-8">Browse through our collection of sweets and pastries, whether it be for your next unforgettable celebration, or for those cravings you cannot resist.</p>
                        <div className="flex gap-4">
                            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                                <DialogTrigger>
                                    <Button text={"Customize your Cake"} type="primary" shape="square"/>
                                </DialogTrigger>
                                {open && (
                                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                                )}
                                <DialogContent className="min-w-3/5 bg-white py-8 shadow-2xl">
                                    <CustomCakeDialog toggleDialog={() => setOpen(false)} setShowSuccess={setShowAlert} />
                                </DialogContent>
                            </Dialog>
                            
                            
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

                <div className="my-16 flex gap-16">
                    <SearchFilters onFilterChange={handleFilterChange}/>
                    <div className="w-0.25 bg-textdark opacity-15"></div>
                    <div className="flex-grow">
                        <h2 className="font-domine font-bold text-xl mb-8">Products</h2>
                        <div className="font-inter flex mb-16 items-center gap-8">
                            <h3 className="font-inter text-md font-medium">Sort By</h3>
                            <div className="flex gap-2">
                                <RadioButton label={"Alphabetical"} value={"alphabetical"} selectedValue={selectedSort} onChange={setSelectedSort} name="sort"/>
                                <RadioButton label={"Price (High to Low)"} value={"price_desc"} selectedValue={selectedSort} onChange={setSelectedSort} name="sort"/>
                                <RadioButton label={"Price (Low to High)"} value={"price_asc"} selectedValue={selectedSort} onChange={setSelectedSort} name="sort"/>
                            </div>
                            <Button text={"Apply Sort"} type="primary" size="small" clickFunction={handleApplySort}/>
                            <div className="flex gap-2 text-sm items-center justify-between border border-primary1/30 rounded-full pl-4 w-1/4 ml-auto ">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search for products..."
                                    className="outline-none"
                                />
                                <Button icon={SearchIcon} type="primary" size="small" clickFunction={() => {
                                    setActiveFilters({...activeFilters, search: searchQuery});
                                }}></Button>
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