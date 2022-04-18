exports.Query = {
    label: () => 'A data with products',

    products: (parent, args, {PRODUCTS}) => {
        let filteredProducts = PRODUCTS;
        const {filter} = args;
        if(filter) {
            if(filter.onSale === true) {
                filteredProducts = filteredProducts.filter(product => product.onSale);
            }
        }
        return filteredProducts;
    },
    product: (parent, args, {PRODUCTS}) => PRODUCTS.find(product => product.id === args.id),

    categories: (parent, args, {CATEGORIES}) => CATEGORIES,
    category: (parent, args, {CATEGORIES}) => CATEGORIES.find(category => category.id === args.id)
}