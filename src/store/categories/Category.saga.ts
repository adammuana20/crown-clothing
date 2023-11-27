import { takeLatest, all, call, put } from 'typed-redux-saga/macro'

import { createProductDocumentFromCategory, getCategoriesAndDocuments } from '../../utils/firebase/Firebase.utils'

import { fetchCategoriesSuccess, fetchCategoriesFailed, CreateProductStart, fetchCategoriesStart, createProductFailed, createProductSuccess } from './Category.action'

import { CATEGORIES_ACTION_TYPES } from './Category.types'

export function* fetchCategoriesStartAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments, 'categories')
        yield* put(fetchCategoriesSuccess(categoriesArray))
    } catch(error) {
        yield* put(fetchCategoriesFailed(error as Error))
    }
}

export function* createProduct({payload: { product, categoryTitle }}: CreateProductStart) {
    try {
        yield* call(createProductDocumentFromCategory, product, categoryTitle)
        yield* put(createProductSuccess())
        yield* put(fetchCategoriesStart())
    } catch(error) {
        yield* put(createProductFailed(error as Error))
    }
}

export function* onFetchCategories() {
    yield* takeLatest( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,  fetchCategoriesStartAsync)
}

export function* onCreateProduct() {
    yield* takeLatest( CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_START, createProduct)
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories), call(onCreateProduct)])
}