import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/Firebase.utils';

import SHOP_DATA from '../shopData.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
    setProducts: () => []
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap()
    }, [])

    const value = { categoriesMap }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}