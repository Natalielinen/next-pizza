'use client';

import { useRouter } from "next/navigation";
import { useCartStore } from "../../store";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { IProduct } from "../../../@types/prisma";

interface Props {
    product: IProduct
}

export const ChooseProduct: React.FC<Props> = ({ product }) => {

    const router = useRouter();
    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);

    const firstItem = product.items[0];

    const isPizzaForm = Boolean(firstItem.pizzaType);


    const onAddProduct = async () => {
        try {
            await addCartItem({
                productItemId: firstItem.id,
            });
            toast.success('Товар добавлен в корзину!');
        } catch (e) {
            toast.error('Не удалось добавить товар в корзину');
            console.log(e);
        } finally {
            router.back();
        }

    };
    const onAddPizza = async (productItemId: number, ingredients: number[]) => {

        try {
            await addCartItem({
                productItemId,
                ingredients
            });
            toast.success('Пицца добавлена в корзину!');
        } catch (e) {
            toast.error('Не удалось добавить пиццу в корзину');

            console.log(e);
        } finally {
            router.back();
        }

    };
    return isPizzaForm
        ? <ChoosePizzaForm
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            name={product.name}
            items={product.items}
            onSubmit={onAddPizza}
            loading={loading}

        />
        : <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={firstItem.price}
            loading={loading}
        />

};