import {gql} from '@apollo/client';


export const ADD_COMMENT_TO_PRODUCT = gql`
    mutation ($productId: Int! $text: String!) {
        addComment(input: {productId: $productId text: $text}) {
            id
            text
        }
    }
`;

export const UPDATE_COMMENT_IN_PRODUCT = gql`
    mutation ($productId: Int! $text: String! $commentId: String!) {
        updateComment(input: {productId: $productId text: $text commentId: $commentId}) {
            id
            text,
        }
    }
`;