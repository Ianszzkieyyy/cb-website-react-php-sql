import React, {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cartItems")
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
          
    })

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item) => {
        setCartItems(prev => [...prev, item])
    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)