import React from "react";
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection";
import HomeGallerySection from "../components/HomeGallery";
import FeatureSection from "../components/Features";


const HomePage = () => {

    return (
        <div >
            <Navbar />
            <HeroSection />
            <HomeGallerySection />
            <FeatureSection />
        </div>
    )
}

export default HomePage