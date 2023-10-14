import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ProductPreview from '../../components/product-preview/ProductPreview.component'
import CategoriesPreview from '../categories-preview/CategoriesPreview.components'
import Category from '../category/Category.component'
import { fetchCategoriesStart } from '../../store/categories/Category.action'


const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesStart())
    }, [])

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