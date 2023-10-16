import { createSelector } from "reselect";

import { RootState } from "../Store";

import { CategoriesState } from "./Category.reducer";
import { CategoryMap } from "./Category.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => categories.reduce(
        (acc, { title, items }) => {
          acc[title.toLowerCase()] = items;
          return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

export const selectAddProductIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.addProductIsLoading
)

export const selectProductError  = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.error
)