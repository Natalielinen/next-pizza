import { prisma } from "../../prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-itam-total-price";

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            cartItems: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true

                        }
                    },
                    ingredients: true

                }
            },
            
        }
    });

    if (!userCart) {
        return 0;
    };

    const totalAmount = userCart?.cartItems.reduce((acc, item) => {
        const price = calcCartItemTotalPrice(item);
        return acc + price;
    }, 0);

   return await prisma.cart.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount
        },
        include: {
            cartItems: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true

                        }
                    },
                    ingredients: true

                }
            },
            
        }
    });
  
};