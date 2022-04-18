import {useQuery} from "@apollo/client";
import {GET_PRODUCTS_BY_CATEGORY} from "../queries/queries";

export const GetProductsByCategory = (id) => {
    const {error, data, loading} = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            id
        }
    });

    return {
        error,
        data,
        loading
    }
}