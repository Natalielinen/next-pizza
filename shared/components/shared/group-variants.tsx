'use client';

import { cn } from "../../lib/utils"


export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
}

interface Props {
    variants: readonly Variant[];
    defaultValue?: string;
    onClick?: (value: Variant['value']) => void;
    selectedValue?: Variant['value'];
    className?: string
}

export const GroupVariants: React.FC<Props> = ({
    variants,
    defaultValue,
    onClick,
    selectedValue,
    className
}) => {

    const onVariantClick = (value: Variant['value'], isDisabled: boolean) => {

        if (isDisabled) {
            return;
        }
        onClick?.(value);
    }


    return (
        <div className={
            cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
                className)
        }>
            {
                variants.map(variant => (
                    <button
                        key={variant.name}
                        onClick={() => onVariantClick(variant.value, variant.disabled as boolean)}
                        className={cn(
                            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                            {
                                'bg-white shadow': variant.value === selectedValue,
                                'text-gray-500 opacity-50': variant.disabled
                            }
                        )}
                    >
                        {variant.name}

                    </button>
                )
                )
            }

        </div>
    )
}