import {GetCategories} from "../../graphql/hooks/getCategories";
import {Link} from "react-router-dom";


export const Categories = () => {
    const {data} = GetCategories();

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Categories</h3>
            <nav>
                <ul className='links'>
                    {data?.categories.map(category => <li key={category.id} className='links__link'><Link to={`/categories/${category.name}/${category.id}`} className='links__link_ref'>{category.name}</Link></li>)}
                </ul>
            </nav>
        </div>
    )
}