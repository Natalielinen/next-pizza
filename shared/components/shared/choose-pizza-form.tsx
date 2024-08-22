
'use client';

import React from "react";
import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "../../constants/pizza";
import { cn } from "../../lib/utils";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientTile } from "./ingredient-tile";
import { calcTotalPizzaPrice } from "../../lib";
import { usePizzaOptions } from "../../hooks";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string,
    loading?: boolean
}

export const ChoosePizzaForm: React.FC<Props> = (
    {
        className,
        imageUrl,
        name,
        ingredients,
        onSubmit,
        items,
        loading
    }) => {

    const {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        toggleIngredient,
        availablePizzaSizes,
        currentItemId
    } = usePizzaOptions(items)

    const totalPrice = calcTotalPizzaPrice({
        items,
        ingredients,
        selectedIngredients,
        size,
        type
    });

    const textDetails = `${mapPizzaSize[size]} см, ${mapPizzaType[type]} пицца, ингредиенты: ${ingredients.map((ingredient) => ingredient.name).join(', ')}`;


    const handdleAddToCart = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }

    };

    return <div className={cn('flex flex-1', className)}>

        <ProductImage
            alt={name}
            src={imageUrl}
            size={size}
        />


        <div className="w-[490px] bg-[#FCFCFC] p-7">

            <Title text={name} size="md" className="font-extrabold mb-1" />

            <p className="text-gray-400">{textDetails}</p>

            <div className="flex flex-col gap-4 mt-5">

                <GroupVariants
                    variants={availablePizzaSizes}
                    selectedValue={String(size)}
                    onClick={(value) => setSize(Number(value) as PizzaSize)}
                />

                <GroupVariants
                    variants={pizzaTypes}
                    selectedValue={String(type)}
                    onClick={(value) => setType(Number(value) as PizzaType)}
                />
            </div>

            <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                <div className="grid grid-cols-3 gap-3">
                    {
                        ingredients.map((ingredient) => (
                            <IngredientTile
                                imageUrl={ingredient.imageUrl}
                                name={ingredient.name}
                                price={ingredient.price}
                                key={ingredient.id}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => toggleIngredient(ingredient.id)}
                            />
                        ))
                    }

                </div>

            </div>

            <Button
                loading={loading}
                className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                onClick={handdleAddToCart}
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>

        </div>
    </div>;
};