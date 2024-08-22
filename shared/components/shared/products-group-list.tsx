'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from 'react-use';
import { useCategoryStore } from "../../store/category";
import { IProduct } from "../../../@types/prisma";

interface Props {
    title: string;
    items: IProduct[];
    listClassName?: string;
    categoryId: number;

    className?: string
}

export const ProductsGroupList: React.FC<Props> = (
    {
        className,
        items,
        title,
        listClassName,
        categoryId
    }
) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef(null);

    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }

    }, [categoryId, intersection?.isIntersecting, title])

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
            <Title
                text={title}
                size="lg"
                className="font-extrabold mb-5"
            />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map((item, index) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            imageUrl={item.imageUrl}
                            price={item.items[0].price}
                            ingredients={item.ingredients}
                        />
                    ))
                }
            </div>

        </div>
    )
}
