import {gql} from '@apollo/client';


export const UPDATE_PRODUCT_COMMENT = gql`
    mutation ($productId: Int! $text: String!) {
        addComment(input: {productId: $productId text: $text}) {
            id
            text
        }
    }
`;