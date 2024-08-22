import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { CartItemDetailsCountButton } from "./cart-item-details/cart-item-details-count-button";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { CartItemInfo } from "./cart-item-details/cart-item-info";

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    price: number;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    details: string;
    value?: number;
}

export const CheckoutItem: React.FC<Props> = ({
    className,
    imageUrl,
    name,
    price,
    onClickCountButton,
    onClickRemove,
    details,
    value
}) => {
    return <div className={cn('flex items-center justify-between', className)}>
        <div className="flex items-center gap-5 flex-1">
            <CartItemDetailsImage
                src={imageUrl}
            />
            <CartItemInfo
                name={name}
                details={details}
            />
        </div>

        <CartItemDetailsPrice
            value={price}
        />

        <div className="flex items-center gap-5 ml-20">
            <CartItemDetailsCountButton
                onClick={onClickCountButton}
                value={value}
            />
            <button onClick={onClickRemove}>
                <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
            </button>
        </div>
    </div>;
};