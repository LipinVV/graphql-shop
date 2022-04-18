import {UploadProducts} from "../../graphql/hooks/uploadProducts";
import {Link} from "react-router-dom";
import './products.css';

export const Products = () => {
    const {error, loading, data} = UploadProducts();
    const products = data?.products;

    if (error) return <h3>Products cannot be displayed because of error</h3>
    if (loading) return <h3>Loading products...</h3>
    return (
        <div>
            <div className='products'>
                {products.map(product => {
                    return <div key={product.id} className='products-product'>
                        <span>{product.category_id}</span>
                        <Link className='products-product_link' to={`/products/${product.id}`}>{product.name}</Link>
                        <span>{product.color}</span>
                    < /div>
                })}
            </div>
        </div>
    )
}