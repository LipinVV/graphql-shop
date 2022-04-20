import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql`
    query getProducts{
        products {
            id,
            name,
            color,
            comments {
                id,
                text
            }
        }
    }
`

export const GET_FILTERED_PRODUCT = gql`
    query getFilteredProduct($id: Int!) {
        product(id: $id) {
            id,
            name,
            color,
            price,
            comments {
                id,
                text
            }
            category {
                id,
                name
            }
        }
    }
`


export const GET_CATEGORIES = gql`
    query getCategories {
        categories {
            id,
            name
        }
    }
`

export const GET_PRODUCTS_BY_CATEGORY = gql`
    query getProductsByCategory($id: Int!) {
        category(id: $id) {
            id,
            name,
            products(filter: {onSale: [true, false]}) {
                id,
                name,
                price,
                onSale,
                comments {
                    id,
                    text
                }
            }
        }
    }
`

// export const GET_PRODUCTS_BY_CATEGORY = gql`
//     query GetProductsByCategory($id: Int!) {
//         category(id: $id) {
//             id,
//             name,
//             products(filter: {onSale: true}) {
//                 id,
//                 name,
//                 color,
//                 onSale
//             }
//         }
//     }
// `