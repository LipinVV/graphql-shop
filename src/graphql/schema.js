const {gql} = require("apollo-server");

exports.typeDefs = gql`
    type Query {
        label: String!
        products(filter: ProductFilterBySale): [Product!]!
        product(id: Int!): Product
        categories: [Category!]!
        category(id: Int!): Category
    }
    type Product {
        id: Int!
        name: String!
        color: String!
        description: String!
        quantity: Int!
        price: Float!
        category_id: Int!
        onSale: Boolean!
        category: Category
    }
    type Category {
        id: ID
        name: String!
        products(filter: ProductFilterBySale):  [Product!]!
    }
    
    input ProductFilterBySale {
        price: Int,
        onSale: [Boolean]
    }
`