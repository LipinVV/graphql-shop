const {ApolloServer} = require("apollo-server");
const {typeDefs} = require("../graphql/schema");
const {Category} = require("../graphql/resolvers/Category");
const {Product} = require("../graphql/resolvers/Product");
const {Query} = require("../graphql/resolvers/Query");
const {Mutation} = require("../graphql/resolvers/Comment");
const {PRODUCTS, CATEGORIES} = require("../server/data/products");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query, Category, Product, Mutation
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