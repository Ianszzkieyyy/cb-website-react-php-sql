import React from "react";
import Button from "./Button";

const HomeGallerySection = () => {
    return (
        <div className="mx-32 pt-30 mb-15">
            <h1 className="font-domine font-bold text-4xl text-primary1 w-md pb-5">Custom cakes, perfectly balanced flavors</h1>
            <p className="font-inter text-md mb-10">View the latest additions to our Cake-talogue</p>
            <Button text="View More" type="outline"/>
        </div>
    )

}

export default HomeGallerySection