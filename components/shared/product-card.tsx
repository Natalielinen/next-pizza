import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";
import {Plus} from "lucide-react";

interface Props {
    className?: string
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export const ProductCard: React.FC<Props> = (
    {
        className,
        name,
        price,
        imageUrl,
        id
    }
) => {
    return (
        <div className={cn('', className)}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <div className="w-[215px] h-[215px]">
                        <img width="100%" height="100%" src={imageUrl} alt={name}/>
                    </div>
                </div>

                <Title
                text={name}
                className="mb-1 mt-3 font-bold"
                size="sm"
                />

                <p className="text-sm text-gray-400">
                    Цыпленок, моцарелла, сыры чедер и пармезан, сырный соус, томаты, соус альфредо, чеснок
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>

                  <Button variant="secondary" className="text-base font-bold">
                      <Plus size={20} className="mr-1" />
                      Добавить
                  </Button>
                </div>

            </Link>
        </div>
    )
}
