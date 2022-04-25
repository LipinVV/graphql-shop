import {Products} from "./frontend/Products";
import {Route, Routes} from "react-router-dom";
import {Product} from "./frontend/Products/Product";
import {Navigation} from "./frontend/Navigation";
import {Categories} from "./frontend/Categories";
import {Category} from "./frontend/Categories/Category";

import './App.css';

function App({client}) {

    return (
        <div className="App">
            <h1>Graphql mini-shop</h1>
            <Routes>
                <Route path='/' element={<Navigation />}/>
                <Route path='/categories' element={<Categories />}/>
                <Route path='/categories/:name/:id' element={<Category client={client} />}/>
                <Route path='/products' element={<Products />}/>
                <Route path='/products/:id/' element={<Product />}/>
                {/*<Route path="*" element={<NoMatch />} />*/}
            </Routes>
        </div>
    );
}

export default App;
