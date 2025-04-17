import React from "react";
import { motion } from "framer-motion";

import ShoppingBag from "../assets/icons/shopping-bag.svg?react"
import Sparkles from "../assets/icons/sparkles.svg?react"

import HeroGroup from "../assets/images/hero_group.png"
import HeroLogo from "../assets/logos/full_logo_pink.svg"

import Button from "./Button";

const HeroSection = () => {
    const fadeInUp = {
        hidden: { 
            opacity: 0, 
            y: 40  
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, 0.01, 0.9] 
            }
        }
    };

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25, 
                delayChildren: 0.1    
            }
        }
    };

    return (
        <div className="relative overflow-hidden">
            <div className="absolute top-0 w-full h-screen bg-gradient-to-b rounded-b-full from-bglight to-primary1/50" />
            
            <motion.div
                initial="hidden"
                animate="visible"
                variants={container}
                className="relative z-10"
            >
                <div className="flex flex-col items-center pt-12">
                    <motion.div variants={fadeInUp}>
                        <img src={HeroLogo} alt="" className="w-28" />
                    </motion.div>
                    
                    <motion.h1 
                        className="font-domine font-bold text-3xl text-primary1 text-center p-8"
                        variants={fadeInUp}
                    >
                        Where Imagination Meets Sweet <span className="bg-accent1 p-1 text-white">Perfection.</span>
                    </motion.h1>
                </div>
                
                <motion.div 
                    className="flex gap-4 justify-center"
                    variants={fadeInUp}
                >
                    <Button text="View our Catalogue" type="secondary" icon={ShoppingBag}/>
                    <Button text="Customize a Cake" type="primary" icon={Sparkles} />
                </motion.div>
                
                <motion.div className="h-max" variants={fadeInUp}>
                    <img 
                        src={HeroGroup} 
                        className="mx-auto drop-shadow-2xl drop-shadow-primary1-darker/30" 
                        alt="Cake display"
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection