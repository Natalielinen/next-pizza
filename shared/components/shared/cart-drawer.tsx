'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";

import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "../../lib";
import { useCartStore } from "../../store";
import React from "react";
import { PizzaSize, PizzaType } from "../../constants/pizza";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "../../hooks";

interface Props {
    className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {

    const {
        updateItemQuantity,
        cartItems,
        totalAmount,
        removeCartItem

    } = useCart();

    const [redirecting, setRedirecting] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'minus' | 'plus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return <div className={cn('', className)}>
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {
                        totalAmount > 0 && (
                            <SheetHeader>
                                <SheetTitle>
                                    В корзине <span className="font-bold">{cartItems.length} товара</span>
                                </SheetTitle>
                            </SheetHeader>

                        )
                    }

                    {
                        !totalAmount && (
                            <div
                                className="flex flex-col items-center justify-center w-72 mx-auto"
                            >
                                <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
                                <Title text="Ваша корзина пуста" size="sm" className="text-center font-bold my-2" />
                                <p className="text-center text-neutral-500 mb-5">
                                    Выберите пиццу в каталоге и добавьте ее в корзину
                                </p>

                                <SheetClose>
                                    <Button className="w-56 h-12 text-base" size="lg">
                                        <ArrowLeft className="w-5 mr-2" />
                                        В каталог
                                    </Button>
                                </SheetClose>
                            </div>
                        )
                    }

                    {/* Items */}
                    {
                        totalAmount > 0 && (
                            <>
                                <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">

                                    {
                                        cartItems && cartItems.map(item => (
                                            <div className="mb-2" key={item.id}>
                                                <CartDrawerItem
                                                    details={getCartItemDetails(
                                                        item.pizzaType as PizzaType,
                                                        item.pizzaSize as PizzaSize,
                                                        item.ingredients
                                                    )}
                                                    id={item.id}
                                                    imageUrl={item.imageUrl}
                                                    name={item.name}
                                                    price={item.price}
                                                    quantity={item.quantity}
                                                    onClickCountButton={(type: 'plus' | 'minus') => onClickCountButton(item.id, item.quantity, type)}
                                                    onClickRemoveButton={() => removeCartItem(item.id)}
                                                    disabled={item.disabled}

                                                />
                                            </div>
                                        ))
                                    }

                                </div>

                                <SheetFooter className="-mx-6 bg-white p-8">
                                    <div className="w-full">
                                        <div className="flex mb-4">
                                            <span className="flex flex-1 text-lg text-neutral-500">
                                                Итого
                                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                            </span>

                                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                                        </div>

                                        <Link href="/checkout">
                                            <Button
                                                onClick={() => setRedirecting(true)}
                                                loading={redirecting}
                                                type="submit"
                                                className="w-full h-12 text-base">
                                                Оформить заказ
                                                <ArrowRight className="w-5 ml-2" />
                                            </Button>
                                        </Link>

                                    </div>

                                </SheetFooter>
                            </>

                        )
                    }

                </div>
            </SheetContent>

        </Sheet>
    </div>;
};