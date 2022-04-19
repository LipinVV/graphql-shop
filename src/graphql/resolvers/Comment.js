const {v4: uuid} = require('uuid');

exports.Mutation = {
    addComment: (parent, {input}, products) => {
        const newComment = {
            id: uuid(),
            text: input.text,
        }
        const targetProduct =  products.PRODUCTS.find(p => p.id === input.productId);
        targetProduct.comments.push(newComment)
        return newComment;
    }
}