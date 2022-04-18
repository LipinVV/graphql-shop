import {useParams} from "react-router-dom";
import {FilteredProduct} from "../../../graphql/hooks/filteredProduct";
import './product.css';

export const Product = () => {
    const {id} = useParams();
    const {error, loading, data} = FilteredProduct(Number(id));
    const filteredProduct = data?.product;

    if(error || !filteredProduct) return <div>There is no such product</div>
    if(loading) return <div>Loading product</div>

    return (
        <div className='product'>
            <span className='product__field'>
                <span className='product__field_decor'>Name: </span>
                {filteredProduct.name}
            </span>
            <span className='product__field'>
                <span className='product__field_decor'>Color: </span>
                {filteredProduct.color}
            </span>
            <span className='product__field'>
                <span className='product__field_decor'>Category: </span>
                {filteredProduct.category.name}
            </span>
        </div>
    )
}