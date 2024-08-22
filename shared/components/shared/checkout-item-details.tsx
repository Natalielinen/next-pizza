import { cn } from "../../lib/utils";

interface Props {
    className?: string;
    title?: React.ReactNode;
    price?: number;
}

export const CheckoutItemDetails: React.FC<Props> = ({ className, title, price }) => {
    return <div className={cn("flex my-4", className)}>
        <span className={cn("flex flex-1 text-lg text-neutral-500")}>
            {title}
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
        </span>

        <span className="font-bold text-lg">{price} ₽</span>
    </div>;
};