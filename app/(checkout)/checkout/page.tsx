'use client';

import {
    CheckoutAddress,
    CheckoutCart,
    CheckoutPersonalInfo,
    CheckoutSidebar,
    Container,
    Title
} from "../../../shared/components/shared";
import { useCart } from "../../../shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    checkoutFormSchema,
    CheckoutFormValues
} from "../../../shared/components/shared/checkout-components/checkout-form-schema";
import { cn } from "../../../shared/lib/utils";
import { createOrder } from "../../actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {

    const [submitting, setSubmitting] = React.useState(false);

    const {
        updateItemQuantity,
        cartItems,
        totalAmount,
        removeCartItem,
        loading
    } = useCart();

    const taxes = Math.floor(totalAmount * 0.05);
    const delivery = 99;

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    const onSubmit = async (data: CheckoutFormValues) => {

        try {

            setSubmitting(true);

            const url = await createOrder(data);

            toast.success('Заказ оформлен!');

            if (url) {
                location.href = url;
            }

        } catch (e) {
            toast.error('Не удалось оформить заказ!');
            console.error(e);
        } finally {
            setSubmitting(false);
        }

    }

    return <Container className="mt-10">
        <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-10">

                    {/*left part*/}
                    <div className="flex flex-col gap-10 flex-1 mb-20">
                        <CheckoutCart
                            cartItems={cartItems}
                            updateItemQuantity={updateItemQuantity}
                            removeCartItem={removeCartItem}
                            loading={loading}
                        />

                        <CheckoutPersonalInfo className={cn({
                            'opacity-40 pointer-events-none': loading
                        })} />

                        <CheckoutAddress
                            className={cn({
                                'opacity-40 pointer-events-none': loading
                            })}
                        />
                    </div>

                    <CheckoutSidebar
                        delivery={delivery}
                        totalAmount={totalAmount}
                        taxes={taxes}
                        loading={loading}
                        submitting={submitting}
                    />

                </div>
            </form>
        </FormProvider>

    </Container>
}