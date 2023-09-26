import { CATEGORIES_ACTION_TYPES } from "./Category.types";

import { createAction } from "../../utils/reducer/Reducer.utils";

export const fetchCategoriesStart = () => {
    return createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START )
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray )
}

export const fetchCategoriesFailed = (error) => {
    return createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error )
}