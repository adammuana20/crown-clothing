export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'categories/FETCH_CATEGORIES_FAILED',
    CREATE_PRODUCT_START = 'categories/CREATE_PRODUCT_START',
    CREATE_PRODUCT_SUCCESS = 'categories/CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAILED = 'categories/CREATE_PRODUCT_FAILED',
    CLEAR_ERROR_NESSAGE = 'categories/CLEAR_ERROR_NESSAGE',
}

export type CategoryItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
}

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
}

export type CategoryMap = {
    [key: string]: CategoryItem[]
}

export type ProductItem = {
    id: string;
    productName: string;
    imageFile: string;
    price: number;
    description: string;
    categoryTitle: string;
}