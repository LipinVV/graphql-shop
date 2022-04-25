import {GetCategories} from "../../graphql/hooks/getCategories";
import {Link} from "react-router-dom";
import './categories.css';

export const Categories = () => {
    const {data} = GetCategories();

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Categories</h3>
            <nav>
                <ul className='links'>
                    {data?.categories.map(category =>
                        <li key={category.id} className='links__link'>
                            <span className='links__link_name'>{category.name}</span>
                            <Link to={`/categories/${category.name}/${category.id}`} className='links__link_ref'>
                                <img loading='lazy' alt={category.name} src={category.link} className='links__link_img'/>
                            </Link>
                        </li>)}
                </ul>
            </nav>
        </div>
    )
}