import { AnyAction } from "redux";
import { Category } from "./Category.types"

import { createProductFailed, createProductStart, fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess, clearProductErrorMessage, createProductSuccess } from "./Category.action";

export type CategoriesState = {
    readonly categories: Category[];
    readonly addProductIsLoading: boolean;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    addProductIsLoading: false,
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState => {

    if(fetchCategoriesStart.match(action)) {
        return {
            ...state, 
            isLoading: true,
        }
    }

    if(createProductStart.match(action)) {
        return {
            ...state,
            addProductIsLoading: true,
        }
    }

    if(createProductSuccess.match(action)) {
        return {
            ...state,
            addProductIsLoading: false,
            error: null,
        }
    }

    if(fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categories: action.payload
        }
    }

    if(fetchCategoriesFailed.match(action) || createProductFailed.match(action)) {
        return {
            ...state, 
            isLoading: false,
            addProductIsLoading: false,
            error: action.payload
        }
    }

    if(clearProductErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}