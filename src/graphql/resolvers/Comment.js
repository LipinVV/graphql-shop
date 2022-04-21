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
    },
    updateComment: (parent, {input}, products) => {
        const targetProduct =  products.PRODUCTS.find(p => p.id === input.productId);
        const found = targetProduct.comments.find(comment => comment.id === input.commentId);
        found.text = input.text;
        return found;
    },
    deleteComment: (parent, {input}, products) => {
        const targetProduct =  products.PRODUCTS.find(p => p.id === input.productId);
        targetProduct.comments = targetProduct.comments.filter(comment => comment.id !== input.commentId);
        return true;
    },
}