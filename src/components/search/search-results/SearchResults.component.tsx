import { InputHTMLAttributes, FC } from "react"
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../../store/categories/Category.selector"
import SearchResult from "../search-result/SearchResult.component";

type SearchResultsProp = {
    searchTerm: string;
} & InputHTMLAttributes<HTMLInputElement>

const SearchResults: FC<SearchResultsProp> = ({ searchTerm }) => {
    const categoriesMap = useSelector(selectCategoriesMap)

    const combinedProductsWithCategory = Object.keys(categoriesMap).reduce((acc, title) => {
        const products = categoriesMap[title].map(product => ({ product, title }));
        return acc.concat(products);
    }, [] as any[]);
    
    return (
        <SearchResult combinedProductsWithCategory={combinedProductsWithCategory} searchTerm={searchTerm} />
    )
}

export default SearchResults