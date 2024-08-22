import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

type ArgsType = {
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
  size: PizzaSize;
  type: PizzaType;
};


export const calcTotalPizzaPrice = (args: ArgsType): number => {
  const {
    items,
    ingredients,
    selectedIngredients,
    size,
    type
  } = args;

  const pizzaPrice = items.find(
    (item) => item.size === size && item.pizzaType === type
  )?.price ?? 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return totalPrice;
};
