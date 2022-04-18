const {ApolloServer} = require("apollo-server");
const {typeDefs} = require("../graphql/schema");
const {Category} = require("../graphql/resolvers/Category");
const {Product} = require("../graphql/resolvers/Product");
const {Query} = require("../graphql/resolvers/Query");
const {PRODUCTS, CATEGORIES} = require("../data/products")

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query, Category, Product
    },
    context: {
        PRODUCTS,
        CATEGORIES
    }
});

server.listen().then(({url}) => {
    console.log('server has started to work at ' + url)
})


//  npm install nodemon -g
// String, Float, Boolean, Int - scalar type, если передать null без восклициательного знака - примет, с ! - строгий режим
// Object type
// parent and args - read about them