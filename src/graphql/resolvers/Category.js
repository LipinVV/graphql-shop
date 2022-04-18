exports.Category = {
    products: (parent, args, {PRODUCTS}) => {
        let filteredCategorizedProducts = PRODUCTS.filter(product => product.category_id === parent.id);
        const {filter} = args;
        if(filter) {
            if(filter.onSale === true) {
                filteredCategorizedProducts = filteredCategorizedProducts.filter(product => product.onSale);
            }
        }
        return filteredCategorizedProducts;
    }
}