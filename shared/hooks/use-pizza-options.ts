import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize
    type: PizzaType
    setSize: (size: PizzaSize) => void
    setType: (type: PizzaType) => void
    selectedIngredients: Set<number>
    toggleIngredient: (id: number) => void
    availablePizzaSizes: Variant[];
    currentItemId: number | undefined;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {

    const [size, setSize] = React.useState<PizzaSize>(30);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

    const availablePizzaSizes = getAvailablePizzaSizes(items, type);

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

     React.useEffect(() => {
        const isAvailableSize = availablePizzaSizes
        .find((size) => Number(size.value) === Number(size) && !size.disabled);
        const firstAvailableSize = availablePizzaSizes
        .find((size) => !size.disabled);
        if (!isAvailableSize && firstAvailableSize) {
            setSize(Number(firstAvailableSize.value) as PizzaSize);
        }

    }, [type])

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        toggleIngredient,
        availablePizzaSizes,
        currentItemId
    }
}