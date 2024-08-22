'use server';

import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";
import { CheckoutFormValues } from "../shared/components/shared/checkout-components/checkout-form-schema";
import { cookies } from "next/headers";
import { sendEmail } from "../shared/lib";
import { PayOrder } from "../shared/components/shared/email-templates/pay-order";
import { hashSync } from "bcrypt";
import { getUserSession } from "../shared/lib/get-user-session";
import { VerificationUserTemplate } from "../shared/components/shared/email-templates/verification-user";


export async function createOrder(data: CheckoutFormValues) {

    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Корзина не найдена');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }

        });

        if (!userCart) {
            throw new Error('Корзина не найдена');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('В корзине нет продуктов');
        }

        const order = await prisma.order.create({ 
        data: {
            fullName: data.firstName + " " + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            token: cartToken,
            totalAmount: userCart.totalAmount,
            status: OrderStatus.PENDING,
            items: JSON.stringify(userCart.cartItems)
        }
     });

     await prisma.cart.update({
         where: { id: userCart.id },
         data: {
            totalAmount: 0
         }
        });

    await prisma.cartItem.deleteMany({
        where: {
            id: userCart.id
        }
    });

    //TODO: mock
    const url = 'https://localhost:3000/';

    await sendEmail(data.email, 'Next Pizza / Оплатите заказ №' + order.id, PayOrder({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: url
    }));

    return 'https://resend.com/docs/send-with-nextjs'


    } catch (e) {
        console.log(e);
        
    }

    
};

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullname: body.fullname,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
};

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: new Date(),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}