import { CATEGORIES_ACTION_TYPES, Category, ProductItem } from "./Category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/Reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FeatchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>
export type CreateProductStart = ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_START, ProductItem>
export type CreateProductSuccess = Action<CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_SUCCESS>
export type CreateProductFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_FAILED, Error>
export type ClearProductErrorMessage = Action<CATEGORIES_ACTION_TYPES.CLEAR_ERROR_NESSAGE>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START ))
export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray ))
export const fetchCategoriesFailed = withMatcher((error: Error): FeatchCategoriesFailed => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error ))
export const createProductStart = withMatcher((productData: ProductItem): CreateProductStart => createAction( CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_START, productData ))
export const createProductSuccess = withMatcher((): CreateProductSuccess => createAction( CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_SUCCESS ))
export const createProductFailed = withMatcher((error: Error): CreateProductFailed => createAction( CATEGORIES_ACTION_TYPES.CREATE_PRODUCT_FAILED, error))
export const clearProductErrorMessage = withMatcher((): ClearProductErrorMessage => createAction( CATEGORIES_ACTION_TYPES.CLEAR_ERROR_NESSAGE ))