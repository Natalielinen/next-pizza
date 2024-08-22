import React from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnType = {
    totalAmount: number;
    cartItems: CartStateItem[];
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    loading: boolean;
    addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnType => {

 const [
        totalAmount,
        fetchCartItems,
        updateItemQuantity,
        removeCartItem,
        cartItems,
        loading,
        addCartItem
    ] = useCartStore(state => [
        state.totalAmount,
        state.fetchCartItems,
        state.updateItemQuantity,
        state.removeCartItem,
        state.cartItems,
        state.loading,
        state.addCartItem
    ]);

    React.useEffect(() => {
        fetchCartItems();

    }, [])

return {
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    cartItems,
    loading,
    addCartItem
}

}