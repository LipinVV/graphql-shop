import {Link} from "react-router-dom";
import './links.css';

export const Navigation = () => {

    return (
        <div>
            <nav>
                <ul className='links'>
                    <Link to='/categories'>Categories</Link>
                    <Link to='/products'>Products</Link>
                </ul>
            </nav>
        </div>
    )
}