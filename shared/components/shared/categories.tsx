'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { useCategoryStore } from "../../store/category";
import { Category } from "@prisma/client";

interface Props {
    categories: Category[]
    className?: string
}


export const Categories: React.FC<Props> = ({ className, categories }) => {
    const activeCategoryId = useCategoryStore((state) => state.activeId)

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className as string)}>
            {
                categories.map((cat) => (
                    <a
                        key={cat.id}
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            activeCategoryId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary'
                        )}
                        href={`/#${cat.name}`}
                    >
                        <button>
                            {cat.name}
                        </button>
                    </a>
                ))
            }
        </div>
    )
}
