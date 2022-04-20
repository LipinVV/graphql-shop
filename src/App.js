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
// понять, как после выбора категории далее управлять фильтрацией кнопками
export default App;
