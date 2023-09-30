import { CATEGORIES_ACTION_TYPES, Category } from "./Category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/Reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FeatchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START ))

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray ))

export const fetchCategoriesFailed = withMatcher((error: Error): FeatchCategoriesFailed => createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error ))