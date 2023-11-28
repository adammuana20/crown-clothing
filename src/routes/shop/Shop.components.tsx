import { Route, Routes } from 'react-router-dom'

import ProductPreview from '../../components/product/product-preview/ProductPreview.component'
import CategoriesPreview from '../../components/category/categories-preview/CategoriesPreview.components'
import Category from '../category/Category.component'



const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category'>
                <Route index element={<Category />}/>
                <Route path=':id' element={<ProductPreview />}/>
            </Route>
        </Routes>
    )
}

export default Shop