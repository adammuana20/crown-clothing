import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/CategoriesPreview.components'
import Category from '../category/Category.component'
import { fetchCategoriesStartAsync } from '../../store/categories/Category.action'


const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesStartAsync())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop