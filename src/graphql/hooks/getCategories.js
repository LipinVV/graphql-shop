import {useQuery} from "@apollo/client";
import {GET_CATEGORIES} from "../queries/queries";

export const GetCategories = () => {
    const {error, data, loading} = useQuery(GET_CATEGORIES);

    return {
        error,
        data,
        loading
    }
}