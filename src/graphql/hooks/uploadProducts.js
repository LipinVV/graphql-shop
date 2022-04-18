import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "../queries/queries";

export const UploadProducts = () => {
    const {error, data, loading} = useQuery(GET_PRODUCTS);

    return {
        error,
        data,
        loading
    }
}