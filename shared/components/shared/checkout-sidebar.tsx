import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { cn } from "../../lib/utils";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";
import { Button, Skeleton } from "../ui";

interface Props {
    totalAmount: number;
    taxes: number;
    delivery: number;
    loading?: boolean;
    submitting?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = (
    {
        totalAmount,
        taxes,
        delivery,
        loading,
        submitting
    }
) => {



    return <div className="w-[450px]">
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {
                    loading
                        ? <Skeleton className="w-full h-11" />
                        : <span
                            className="text-[34px] font-extrabold"
                        >
                            {totalAmount + taxes + delivery} ₽
                        </span>
                }

            </div>

            <CheckoutItemDetails
                title={
                    <>
                        <Package className="mr-2 text-gray-300" />
                        Стоимость товаров:
                    </>
                }
                price={totalAmount}
            />

            <CheckoutItemDetails
                title={
                    <>
                        <Percent className="mr-2 text-gray-300" />
                        Налоги:
                    </>
                }
                price={taxes}
            />

            <CheckoutItemDetails
                title={
                    <>
                        <Truck className="mr-2 text-gray-300" />
                        Доставка:
                    </>
                }
                price={delivery}
            />

            <Button
                loading={submitting}
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>

        </WhiteBlock>
    </div>;
};