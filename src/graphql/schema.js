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
        comments: [Comment!]!
    }
    type Category {
        id: ID
        name: String!
        products(filter: ProductFilterBySale):  [Product!]!
    }
    
    type Comment {
        id: ID!,
        text: String
    }
    
    type Mutation {
        addComment(input: AddCommentInput!): Comment!
        updateComment(input: updateCommentInput!): Comment!
    }

    input updateCommentInput {
        productId: Int!
        text: String
        commentId: String!
    }
    
    input AddCommentInput {
        productId: Int!
        text: String
    }
    
    input ProductFilterBySale {
        price: Int,
        onSale: [Boolean]
    }
`