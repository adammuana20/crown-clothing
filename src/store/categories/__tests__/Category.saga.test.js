import { call } from 'typed-redux-saga/macro'
import { testSaga, expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'

import { fetchCategoriesStartAsync, onFetchCategories, categoriesSaga } from '../Category.saga'
import { getCategoriesAndDocuments } from '../../../utils/firebase/Firebase.utils'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../Category.action'

import { CATEGORIES_ACTION_TYPES } from '../Category.types'

describe('Category sagas', () => {
    test('categoriesSaga', () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone()
    })

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesStartAsync)
            .next()
            .isDone()
    })

    test('fetchCategoriesStartAsync success', () => {
        const mockCategoriesArray = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
            { id: 3, name: 'Category 3' }
        ]

        return expectSaga(fetchCategoriesStartAsync)
            .provide([
                [call(getCategoriesAndDocuments, 'categories'), mockCategoriesArray]
            ])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run()
    })

    test('fetchCategoriesStartAsync failed', () => {
        const error = new Error('an error occuerd')

        return expectSaga(fetchCategoriesStartAsync)
            .provide([
                [call(getCategoriesAndDocuments, 'categories'), throwError(error)]
            ])
            .put(fetchCategoriesFailed(error))
            .run()
    })
})