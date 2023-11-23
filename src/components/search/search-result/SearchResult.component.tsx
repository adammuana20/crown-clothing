import { FC } from "react"

import HighlightedSuggestion from "../highlighted-suggestion/HighlightedSuggestion.component";
import { CategoryItem } from "../../../store/categories/Category.types";

import { SearchResultContainer, ResultLink, NoResult } from "./SearchResult.styles"

type combinedProductAndCategory = {
    product: CategoryItem;
    title: string;
}

type SearchResultProp = {
    combinedProductsWithCategory: combinedProductAndCategory[];
    searchTerm: string;
}

const SearchResult: FC<SearchResultProp> = ({ combinedProductsWithCategory, searchTerm }) => {
    const filteredProductsName = combinedProductsWithCategory.filter(({product}) => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    return (
            <SearchResultContainer>
                { filteredProductsName
                    .map((suggestion, i) => 
                        <ResultLink to={`shop/${suggestion.title}/${suggestion.product.id}`} key={i}>
                                <HighlightedSuggestion searchTerm={searchTerm} suggestion={suggestion.product.name} />
                        </ResultLink>)
                }
                { filteredProductsName.length === 0 && (
                        <NoResult>No results found...</NoResult>
                    )
                }
            </SearchResultContainer>
    )
}

export default SearchResult