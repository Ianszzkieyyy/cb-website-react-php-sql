import React from "react";

import ShoppingBag from "../assets/icons/shopping-bag.svg?react"
import Sparkles from "../assets/icons/sparkles.svg?react"

import HeroGroup from "../assets/images/hero_group.png"
import HeroLogo from "../assets/logos/full_logo_pink.svg?react"

import Button from "./Button";

const HeroSection = () => {

    return (
        <div >
            <div className="relative">
                <div className="fixed inset-0 -z-10 h-full w-full bg-bglight bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>
            
            <div className="flex flex-col items-center pt-12">
                <HeroLogo width={96}/>
                <h1 className="font-domine font-bold text-3xl text-primary1 text-center p-8">Where Imagination Meets Sweet <span className="bg-accent1 p-1 text-white">Perfection.</span></h1>
            </div>
            <div className="flex gap-4 justify-center">
                <Button text="View our Catalogue" type="secondary" icon={ShoppingBag}/>
                <Button text="Customize a Cake" type="primary" icon={Sparkles} />
            </div>
            <div className="h-max">
                <img src={HeroGroup} className="mx-auto" alt="" />
            </div>
        </div>
    )

}
export default HeroSection