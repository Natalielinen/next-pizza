'use client';

import { Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import { IProduct } from "../../../../@types/prisma";
import React from "react";
import { ChooseProduct } from "../choose-product";


interface Props {
    product: IProduct;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {

    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)} >
                <ChooseProduct product={product} />

            </DialogContent>
        </Dialog>
    )
};