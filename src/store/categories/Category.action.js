import { CATEGORIES_ACTION_TYPES } from "./Category.types";

import { createAction } from "../../utils/reducer/Reducer.utils";

export const setCategories = (categoriesArray) => {
    return createAction( CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
}