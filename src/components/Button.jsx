import React from "react";

const Button = ({text, shape="pill", type="primary", icon: Icon, size="regular", clickFunction}) => {
    const baseClasses = `font-inter font-semibold cursor-pointer transition duration-300 ease-in-out`

    const hasIcon = !!Icon;

    const typeClasses = {
        primary: "bg-primary1 hover:bg-primary1-darker text-white",
        secondary: "bg-secondary1 hover:bg-secondary1-darker text-white",
        accent: "bg-accent1 hover:bg-accent1-darker text-white",
        outline: "bg-transparent border-2 border-secondary1 hover:border-secondary1-darker text-secondary1 hover:text-secondary1-darker",
    }

    const shapeClasses = {
        pill: "rounded-full",
        square: "rounded-sm"
    }

    const sizeClasses = {
        regular: "px-8 py-3 text-sm",
        small: "px-2 py-2 text-xs",
    }

    return (
        <button onClick={clickFunction} className={`${baseClasses} ${shapeClasses[shape] || shapeClasses["pill"]} ${typeClasses[type] || typeClasses["primary"]} ${sizeClasses[size]} ${hasIcon ? "flex items-center gap-1" : ""}`}>
            {hasIcon && <Icon className={size === "small" ? "h-4" : ""}/>}
            {text}
        </button>
    )


}

export default Button