import {Link, useParams} from "react-router-dom";
import {GetProductsByCategory} from "../../../graphql/hooks/getProductsByCategory";
import {useEffect, useState} from "react";
import './category.css';
import {Comments} from "../../Products/Product/Comments/Comments";

export const Category = () => {
    const {id} = useParams();
    const {error, loading, data} = GetProductsByCategory(Number(id));
    const products = data?.category?.products;

    const getData = async () => {
        try {
            const allDataFromServer = await data?.category?.products;
            setProductsToSort(allDataFromServer);
            setFilteredProducts(allDataFromServer);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getData();
    }, [products])

    const [productsToSort, setProductsToSort] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const searchHandler = (word, words) => {
        const arrangedWords = words.filter((product) => {
            if (word === '') {
                return product;
            }
            if (product.name.toLowerCase().includes(word.toLowerCase()) ||
                product.name.toLowerCase().includes(word.toLowerCase())) {
                return product;
            }
        })
        setProductsToSort(arrangedWords);
    }

    const [filter, setFilter] = useState({price: [], onSale: [], priceScaling: []});

    const options = {
        price: ['high', 'low'],
        onSale: [true, false],
        priceScaling: [true, false]
    }

    useEffect(() => {
        const getFilteredProducts = (productsFromState, filter) => {
            let result = productsFromState;
            if (filter?.onSale.length > 0) {
                result = result?.slice().filter(product => filter.onSale.includes(product.onSale))
            }
            if(filter?.priceScaling.at(-1) === true) {
                result = result?.slice().sort((a, b) => b.price - a.price);
            }
            if(filter?.priceScaling.at(-1) === false) {
                result = result?.slice().sort((a, b) => a.price - b.price);
            }
            return result;
        }
        setFilteredProducts(getFilteredProducts(productsToSort, filter));
    }, [filter, productsToSort])

    if (error) return <div>There is no such product</div>
    if (loading) return <div>Loading product</div>

    return <div style={{margin: '0 auto'}}>
        <h4 className='category__header'>{data?.category?.name}</h4>
        Search<input type='text' onChange={(e) => searchHandler(e.target.value, products)}/>
        {options.onSale.map(onSaleOption => {
            return (
                <div key={onSaleOption.toString()}>
                    <label>
                        <input
                            type='checkbox'
                            onChange={(event) => {
                                let newOnSaleOption = [];
                                if (event.target.checked) {
                                    newOnSaleOption.push(onSaleOption);
                                } else {
                                    newOnSaleOption = newOnSaleOption.filter(selectedOption => onSaleOption !== selectedOption);
                                }
                                setFilter({...filter, onSale: newOnSaleOption});
                            }}
                        />{onSaleOption ? 'On Sale' : 'Regular Price'}
                    </label>
                </div>
            )
        })}
        {options.priceScaling.map(priceScaleOption => {
            return (
                <div key={priceScaleOption.toString()}>
                    <label>
                        <input
                            type='checkbox'
                            // checked={filter.priceScaling?.at(-1) === priceScaleOption}
                            onChange={(event) => {
                                let priceScalingOption = [];
                                if (event.target.checked) {
                                    priceScalingOption.push(priceScaleOption);
                                } else {
                                    console.log('ELSE')
                                    priceScalingOption = priceScalingOption.filter(selectedOption => priceScaleOption !== selectedOption);
                                }
                                setFilter({...filter, priceScaling: priceScalingOption});
                            }}
                        />{priceScaleOption ? 'By highest price' : 'By lowest price'}
                    </label>
                </div>
            )
        })}
        <div className='category'>
            {filteredProducts?.map(product => <div className='category__product' key={product.id}>
                <Link to={`/products/${product.id}`} className='category__product_link'>{product.name}</Link>
                <span>{product.price}</span>
                <span>{product.onSale ? 'On Sale!' : 'Regular Price'}</span>
                <Comments comments={product.comments} productId={product.id} />
            </div>)}
        </div>
    </div>
}

// const [sortType, setSortType] = useState('');
// useEffect(() => {
//     const sortArray = type => {
//         const types = {
//             price: 'price',
//             id: 'id',
//         };
//         const sortProperty = types[type];
//         const sorted = filteredProducts?.slice().sort((a, b) => b[sortProperty] - a[sortProperty]);
//         setFilteredProducts(sorted);
//     };
//
//     sortArray(sortType);
// }, [sortType, sortedProducts]);