import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    selestedTypesIds: string;
    selestedSizesIds: string;
    ingredients: string;
}

interface ReturnType {
    selectedIngredients: Set<string>;
    selestedSizesIds: Set<string>;
    selestedTypesIds: Set<string>;
    priceFrom?: number;
    priceTo?: number;
    toggleIngredients: (id: string) => void;
    toggleSize: (id: string) => void;
    toggleType: (id: string) => void;
    onPriceChange: (value: number[]) => void
}

export const useFilters = (): ReturnType => {
    
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',') || []));
    const [selestedSizesIds, { toggle: toggleSize }] = useSet(new Set<string>(searchParams.get('selestedSizesIds')?.split(',') || []));
    const [selestedTypesIds, { toggle: toggleType }] = useSet(new Set<string>(searchParams.get('selestedTypesIds')?.split(',') || []));
    const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

    const onPriceChange = (value: number[]) => {
        setPrice({ priceFrom: value[0], priceTo: value[1] });
    };


    return {
        selectedIngredients,
        selestedSizesIds,
        selestedTypesIds,
        priceFrom,
        priceTo,
        toggleIngredients,
        toggleSize,
        toggleType,
        onPriceChange
    }
}