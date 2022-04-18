import {useQuery} from "@apollo/client";
import {GET_FILTERED_PRODUCT} from "../queries/queries";

export const FilteredProduct = (id) => {
    const {error, data, loading} = useQuery(GET_FILTERED_PRODUCT, {
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