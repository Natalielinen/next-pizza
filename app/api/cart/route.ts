import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma-client";
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from "../../../shared/lib";
import { CreateCartItemValues } from "../../../shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {

  try {

      const token = req.cookies.get('cartToken')?.value;

      if (!token) {

          return NextResponse.json({totalAmount: 0, cartItems: []});
      }

      const userCart = await prisma.cart.findFirst({
        where: {
            OR: [
                
                {
                    token
                }
            ]
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


      return NextResponse.json(userCart);
    
  } catch (error) {
      console.log(error);   
  }

    
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: {
                    every: {id: {in: data.ingredients}},
                    some: {}
                }
                                   
            },

        });


        // Если такой продукт уже есть в корзине, то увеличиваем его количество
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                }
                
            });
         
        } else {
              await prisma.cartItem.create({
            data: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
            },
        });

        }

      
        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;


    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Не удалось создать корзину'}, {status: 404});

    }

}

