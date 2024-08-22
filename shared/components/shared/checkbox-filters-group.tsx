'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    loading?: boolean;
    selectedIds?: Set<string>;
    name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        className,
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = 'Поиск...',
        loading,
        onClickCheckbox,
        selectedIds,
        name

    }) => {

    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');



    const list = showAll
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems?.slice(0, limit);

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }

    if (loading) {
        return <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {
                ...[...new Array(limit)].map((_, index) => (
                    <Skeleton key={index} className="h-6 mb-5 rounded-[8px]" />
                ))
            }

        </div>;
    }

    return (
        <div className={cn('', className)}>
            <p className="font-bold mb-3">{title}</p>
            {
                showAll && <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={(e) => onChangeSearchInput(e.target.value)}
                    />
                </div>
            }

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {
                    list.map((item, index) => (
                        <FilterCheckbox
                            onCheckedChange={() => onClickCheckbox?.(item.value)}
                            checked={selectedIds?.has(item.value)}
                            key={String(item.value)}
                            value={item.value}
                            text={item.text}
                            endAdornment={item.endAdornment}
                            name={name}
                        />
                    ))
                }
            </div>

            {
                items.length > limit && (
                    <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                        <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                            {showAll ? 'Скрыть' : '+ Показать все'}
                        </button>
                    </div>
                )
            }
        </div>
    )
}
