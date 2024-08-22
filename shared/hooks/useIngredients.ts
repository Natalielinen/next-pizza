import React from "react";
import { Api } from "../services/api-client";


type IngredientItem = {
    value: string,
    text: string
}

type ReturnType = {
    ingredients: IngredientItem[],
    loading: boolean
}
export const useIngredients = (): ReturnType => {
    const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);

         Api.ingredients.getAll()
         .then(res => {
            setIngredients(res.map(item => ({value: String(item.id), text: item.name})));
            setLoading(false);
         })
         .catch(err => console.error(err))
         .finally(() => setLoading(false));
    }, [])

    return {ingredients, loading}

}