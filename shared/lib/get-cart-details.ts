import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-itam-total-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{name: string, price: number}>;
}

interface ReturnValue {
    cartItems: CartStateItem[];
    totalAmount: number;

}

export const getCartDetails = (data: CartDTO): ReturnValue => {

    const items = data.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        disabled: false,
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price
        }))
    }))


    return {
        cartItems: items,
        totalAmount: data.totalAmount
    }
   
}