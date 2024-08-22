'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import qs from "qs";
import { useRouter } from "next/navigation";
import { useIngredients } from "../../hooks/useIngredients";
import { useFilters } from "../../hooks/useFilters";

interface Props {
    className?: string
}


export const Filters: React.FC<Props> = ({ className }) => {

    const router = useRouter()

    const { ingredients, loading } = useIngredients()
    const {
        onPriceChange,
        selectedIngredients,
        selestedSizesIds,
        selestedTypesIds,
        priceFrom,
        priceTo,
        toggleSize,
        toggleType,
        toggleIngredients
    } = useFilters();

    React.useEffect(() => {
        const filters = {
            priceFrom,
            priceTo,
            selestedTypesIds: Array.from(selestedTypesIds),
            selestedSizesIds: Array.from(selestedSizesIds),
            ingredients: Array.from(selectedIngredients)
        };

        const query = qs.stringify(filters, {
            arrayFormat: 'comma'
        });

        router.push(`?${query}`, {
            scroll: false
        });

    }, [selestedTypesIds, selestedSizesIds, selectedIngredients, priceFrom, priceTo, router])

    return (
        <div className={cn('', className as string)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={toggleType}
                selectedIds={selestedTypesIds}
                defaultItems={
                    [
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]
                }
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={toggleSize}
                selectedIds={selestedSizesIds}
                defaultItems={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            <div className="mt-5 border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        step={10}
                        value={String(priceFrom)}
                        onChange={e => onPriceChange([Number(e.target.value), priceTo as number])}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        step={10}
                        value={String(priceTo)}
                        onChange={e => onPriceChange([priceFrom as number, Number(e.target.value)])}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[priceFrom || 0, priceTo || 1000]}
                    onValueChange={value => onPriceChange(value)}
                />

                <CheckboxFiltersGroup
                    title="Ингредиенты"
                    name="ingredients"
                    className="mt-5"
                    limit={6}
                    defaultItems={ingredients.slice(0, 6)}
                    items={ingredients}
                    loading={loading}
                    onClickCheckbox={toggleIngredients}
                    selectedIds={selectedIngredients}
                />

            </div>
        </div>
    )
}
