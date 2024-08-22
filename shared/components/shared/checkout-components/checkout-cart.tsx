import { PizzaSize, PizzaType } from "../../../constants/pizza";
import { getCartItemDetails } from "../../../lib";
import { CartStateItem } from "../../../lib/get-cart-details";
import { Skeleton } from "../../ui";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";


interface Props {
    cartItems: CartStateItem[];
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
    cartItems,
    updateItemQuantity,
    removeCartItem,
    loading
}) => {

    return <WhiteBlock title="1. Корзина">
        <div className="flex flex-col gap-5">

            {
                loading && [...Array(4)].map((_, index) => <Skeleton key={index} className="h-32" />)
            }
            {
                cartItems.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        details={getCartItemDetails(
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize,
                            item.ingredients)}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        onClickCountButton={(type) => updateItemQuantity(item.id, type === 'plus' ? item.quantity + 1 : item.quantity - 1)}
                        onClickRemove={() => removeCartItem(item.id)}
                        value={item.quantity}
                    />
                ))
            }

        </div>

    </WhiteBlock>;
};