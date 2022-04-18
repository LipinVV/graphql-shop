exports.Product = {
    category: (parent, args, {CATEGORIES}) => { // context.CATEGORIES
        return CATEGORIES.find(category => category.id === parent.category_id);
    }
}