import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import LogoIcon from "../assets/logos/icon_logo_black.svg?react"
import CircularText from "../assets/icons/circular_text.png"
import FtImg1 from "../assets/images/feature_img1.png"
import FtImg2 from "../assets/images/feature_img2.png"
import FtImg3 from "../assets/images/feature_img3.png"
import FtImg4 from "../assets/images/feature_img4.png"
import FtImg5 from "../assets/images/feature_img5.jpg"
import FtImg6 from "../assets/images/feature_img6.jpg"

import Button from "./Button";


// Create a flip card component for better reusability
const FlipCard = ({ frontContent, backContent, id, flippedCards, setFlippedCards, onEnterTransition="right" }) => {
    const cardRef = useRef(null);
    
    const handleMouseEnter = () => {
        setFlippedCards(prev => ({
            ...prev,
            [id]: true
        }));
    };
    
    const handleMouseLeave = () => {
        setFlippedCards(prev => ({
            ...prev,
            [id]: false
        }));
    };
    
    // Add mouseout event listener for better detection when mouse leaves quickly
    useEffect(() => {
        const handleMouseOut = (e) => {
            const cardElement = cardRef.current;
            
            // Check if the mouse has moved outside the card
            if (cardElement && !cardElement.contains(e.relatedTarget)) {
                handleMouseLeave();
            }
        };
        
        const cardElement = cardRef.current;
        if (cardElement) {
            cardElement.addEventListener('mouseout', handleMouseOut);
        }
        
        return () => {
            if (cardElement) {
                cardElement.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }, [id]);

    const scrollDirection = {
        "right": [-200, 0],
        "left": [200, 0],
        "up": [0, 200],
        "down": [0, -200],
    }
    
    return (
        <motion.div 
            className="w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
            initial={{
                x: scrollDirection[`${onEnterTransition}`][0],
                y: scrollDirection[`${onEnterTransition}`][1],
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                y: 0,
                opacity: 1,
                transition: {
                    duration: 1,
                }
            }}
            viewport={{
                once: true,
            }}
        >
            <div className="relative w-full h-full perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: flippedCards[id] ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front Card */}
                    <motion.div 
                        className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {frontContent}
                    </motion.div>

                    {/* Back Card */}
                    <motion.div 
                        className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
                        style={{ 
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                        }}
                    >
                        {backContent}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const FeatureSection = () => {
    const [flippedCards, setFlippedCards] = useState({
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
        card6: false,
        card7: false,
    });
    
    // Global mouse move handler to help with edge cases
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            // Get all elements under the current mouse position
            const elementsUnderMouse = document.elementsFromPoint(e.clientX, e.clientY);
            
            // Check which card the mouse is currently over
            const cardsToReset = {};
            let mouseOverAnyCard = false;
            
            // Check if any flip card is under the mouse
            Object.keys(flippedCards).forEach(cardId => {
                const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                if (cardElement) {
                    const isMouseOver = elementsUnderMouse.includes(cardElement);
                    
                    // If card is flipped but mouse isn't over it, reset it
                    if (flippedCards[cardId] && !isMouseOver) {
                        cardsToReset[cardId] = false;
                    }
                    
                    if (isMouseOver) {
                        mouseOverAnyCard = true;
                    }
                }
            });
            
            // Apply resets if needed
            if (Object.keys(cardsToReset).length > 0) {
                setFlippedCards(prev => ({
                    ...prev,
                    ...cardsToReset
                }));
            }
        };
        
        document.addEventListener('mousemove', handleGlobalMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [flippedCards]);

    return (
        <div>
            <div className="grid grid-cols-5 gap-4 mx-32 my-32 grid-rows-[1fr_1fr_0.5fr_1fr_1fr] h-[90vh]">
                {/* Card 1 - Bottom Right */}
                <div className="col-span-3 row-span-2 col-start-3 row-start-4" data-card-id="card1">
                    <FlipCard 
                        id="card1"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        onEnterTransition="left"
                        frontContent={
                            <div className="relative w-full h-full flex bg-accent2">
                                <h1 className="font-domine font-black text-4xl text-textdark w-1/2 ml-12 mt-12">
                                    Why Choose Cakes & Bakes By Ria?
                                </h1>
                                <div className="absolute right-0 top-0 h-[120%] flex items-center">
                                    <img src={FtImg1} alt="Featured cake" className="h-full object-contain object-right" />
                                </div>
                            </div>
                        }
                        backContent={
                            <div className="bg-accent2-darker p-8 flex flex-col justify-center h-full">
                                <p className="p-8 font-inter text-textdark text-lg text-justify">
                                    At Cakes & Bakes by Ria, we believe that a cake should be more than just a beautiful centerpiece—it should taste just as good as it looks. Our handcrafted cakes are made with the finest ingredients, ensuring a delightful balance of sweetness, creaminess, and light, fluffy textures that leave a lasting impression.
                                </p>
                            </div>
                        }
                    />
                </div>

                {/* Card 2 - Middle Left */}
                <div className="row-span-3 col-start-2 row-start-3" data-card-id="card2">
                    <FlipCard 
                        id="card2"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        onEnterTransition="up"
                        frontContent={
                            <div className="relative w-full h-full bg-secondary1 overflow-hidden rounded-xl">
                                <h1 className="font-domine font-bold text-2xl text-textdark w-1/2 ml-8 mt-8">
                                    Trendy & Timeless
                                </h1>
                                <div className="absolute -left-15 top-15 h-[120%] flex items-center">
                                    <img src={FtImg4} alt="" className="h-full w-full object-contain object-left" />
                                </div>
                            </div>
                        }
                        backContent={
                            <div className="bg-secondary1 p-8 flex flex-col justify-center h-full">
                                <p className="font-inter text-textdark text-md text-justify">
                                    We never compromise on quality. From our light and airy chiffon to our decadent moist chocolate, every bite reflects our dedication to excellence and our commitment to creating desserts that stand the test of time.
                                </p>
                            </div>
                        }
                    />
                </div>

                {/* Card 3 - Top Middle */}
                <div className="row-span-3 col-start-3 row-start-1" data-card-id="card3">
                    <FlipCard 
                        id="card3"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        onEnterTransition="down"
                        frontContent={
                            <div className="relative w-full h-full bg-accent1 overflow-hidden rounded-xl">
                                <img src={FtImg5} alt="" className="absolute h-full scale-130 object-cover object-center left-3" />
                            </div>
                        }
                        backContent={
                            <div className="bg-accent5 p-8 flex flex-col justify-center h-full">
                                <h2 className="font-domine font-bold text-2xl text-textdark mb-4">Our Gallery</h2>
                                <p className="font-inter text-textdark text-md text-justify mb-2">
                                    Browse through our collection of handcrafted cakes and pastries. Each creation is a unique masterpiece designed with love and attention to detail.
                                </p>
                                <Button text={"View Gallery"} size="small" type="primary" shape="square"/>
                            </div>
                        }
                    />
                </div>

                {/* Card 4 - Middle Right */}
                <div className="row-span-2 col-start-4 row-start-2" data-card-id="card4">
                    <FlipCard 
                        id="card4"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        onEnterTransition="left"
                        frontContent={
                            <div className="relative w-full h-full bg-accent4 overflow-hidden rounded-xl">
                                <h1 className="font-domine font-bold text-xl text-textdark ml-4 mt-4">
                                    Perfectly Balanced Taste
                                </h1>
                                <div className="absolute top-15 h-[120%] flex items-center">
                                    <img src={FtImg3} alt="" className="h-full object-contain" />
                                </div>
                            </div>
                        }
                        backContent={
                            <div className="bg-accent4 p-6 flex flex-col justify-center h-full">
                                <p className="font-inter text-textdark text-sm text-justify">
                                    Unlike other cakes that can be overly sweet, our cakes are crafted for the perfect harmony of flavors, offering a guilt-free indulgence that's rich, satisfying, and never overpowering.
                                </p>
                            </div>
                        }
                    />
                </div>

                {/* Card 5 - Top Right Logo - No flip needed */}
                <div className="col-span-1 col-start-5 row-start-1 rounded-xl">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <img src={CircularText} alt="" className="absolute h-full w-full object-contain object-center animate-spin spin-slower" />
                        <LogoIcon className="absolute h-1/2 w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-60"/>
                    </div>
                </div>

                {/* Card 6 - Bottom Left */}
                <div className="row-span-2 col-start-1 row-start-3" data-card-id="card6">
                    <FlipCard 
                        id="card6"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        frontContent={
                            <div className="relative w-full h-full bg-accent1 overflow-hidden rounded-xl">
                                <img src={FtImg6} alt="" className="absolute h-full w-full object-contain object-center scale-150 top-5" />
                            </div>
                        }
                        backContent={
                            <div className="bg-accent1 p-6 flex flex-col justify-center h-full">
                                <p className="font-inter text-textdark text-sm text-justify">
                                    Our specialty cakes are designed to make your special moments unforgettable. Each creation is baked with the finest ingredients and decorated with meticulous attention to detail.
                                </p>
                            </div>
                        }
                    />
                </div>

                {/* Card 7 - Top Left */}
                <div className="col-span-2 row-span-2 col-start-1 row-start-1" data-card-id="card7">
                    <FlipCard 
                        id="card7"
                        flippedCards={flippedCards}
                        setFlippedCards={setFlippedCards}
                        frontContent={
                            <div className="relative w-full h-full bg-accent3 overflow-hidden rounded-xl">
                                <h1 className="font-domine font-bold text-2xl text-textdark w-1/2 ml-6 mt-8">
                                    Custom Designs, Made with Passion.
                                </h1>
                                <div className="absolute -right-20 top-0 h-[120%] flex items-center">
                                    <img src={FtImg2} alt="" className="h-full object-contain object-right" />
                                </div>
                            </div>
                        }
                        backContent={
                            <div className="bg-accent3 p-8 flex flex-col justify-center h-full">
                                <p className="font-inter text-textdark text-md text-justify">
                                    Bring your vision to life with our fully customizable cakes. Whether it's an idea you've sketched, a trend you've fallen in love with, or a special theme you're planning, we make your dream cake a reality.
                                </p>
                                <p className="font-inter text-textdark text-md text-justify mt-3">
                                    Every cake is baked with love and care, ensuring that each order is not just a dessert, but a delightful experience worth savoring.
                                </p>
                            </div>
                        }
                    />
                </div>
            </div>
    
        </div>
    )
}

export default FeatureSection