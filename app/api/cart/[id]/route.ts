import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "../../../../shared/lib";

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    try {

        const {id} = params;
        const data = (await req.json()) as {quantity: number};

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {

          return NextResponse.json({error: 'Корзина не найдена'}, {status: 404});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id),
            }
        });

        if (!cartItem) {
            return NextResponse.json({error: 'Товар не найден'}, {status: 404});
        };

        await prisma.cartItem.update({
            where: {
                id: Number(id),
            },
            data: {
                quantity: data.quantity
            }
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Не удалось обновить корзину"}, {status: 500});
    }

}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({error: 'Корзина не найдена'}, {status: 404});
        }

       const cartItem =  await prisma.cartItem.findFirst({
           where: {
               id
           }
       });

       if (!cartItem) {
           return NextResponse.json({error: 'Товар не найден'}, {status: 404});
       };

       await prisma.cartItem.delete({
           where: {
               id
           }
       });

       const updatedUserCart = await updateCartTotalAmount(token);

       return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Не удалось удалить корзину"}, {status: 500});
    }

}
