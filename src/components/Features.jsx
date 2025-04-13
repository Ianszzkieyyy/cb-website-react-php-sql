import React from "react";

import FeatureImg from "../assets/images/feature_img.png"


const FeatureCard = ({title, text, color="bg-accent1"}) => {
    return (
        <div className={`rounded-2xl ${color} box-border h-full`}>
            <h1 className="font-domine font-bold text-xl text-textdark mb-4 pl-8 pt-8">{title}</h1>
            <p className="font-inter text-justify text-s text-textdark px-8">{text}</p>
        </div>
    )
}

const FeatureSection = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-10 mx-32">
            <div className="col-span-2 row-span-2">
                <img className="object-cover w-full h-full rounded-4xl" src={FeatureImg} alt="" />
            </div>
            <div className="col-span-2 row-span-2 col-start-3 bg-accent2 rounded-4xl p-16 ">
                <h1 className="text-textdark text-4xl font-domine font-bold w-md mb-12">
                    Why Choose Cakes & Bakes By Ria?
                </h1>
                <p className="font-inter text-xl text-textdark text-justify">
                    At Cakes & Bakes by Ria, we believe that a cake should be more than just a beautiful centerpiece—it should taste just as good as it looks. Our handcrafted cakes are made with the finest ingredients, ensuring a delightful balance of sweetness, creaminess, and light, fluffy textures that leave a lasting impression.
                </p>
            </div>
            <FeatureCard className="row-span-1 row-start-3" text={"Bring your vision to life with our fully customizable cakes. Whether it’s an idea you’ve sketched, a trend you’ve fallen in love with, or a special theme you’re planning, we make your dream cake a reality."} title={"Custom Designs"} color={"bg-accent3"}  />
            <FeatureCard className="row-span-1 row-start-3" text={"Unlike other cakes that can be overly sweet, our cakes are crafted for the perfect harmony of flavors, offering a guilt-free indulgence that’s rich, satisfying, and never overpowering."} title={"Perfectly Balanced Taste"} color={"bg-accent4"}  />
            <FeatureCard className="row-span-1 row-start-3" text={"We never compromise on quality. From our light and airy chiffon to our decadent moist chocolate, every bite reflects our dedication to excellence."} title={"Trendy & Timeless"} color={"bg-secondary1"}  />
            <FeatureCard className="row-span-1 row-start-3" text={"Every cake is baked with love and care, ensuring that each order is not just a dessert, but a delightful experience worth savoring."} title={"Made with Passion"} color={"bg-accent5"}  />
        </div>
    )

}

export default FeatureSection