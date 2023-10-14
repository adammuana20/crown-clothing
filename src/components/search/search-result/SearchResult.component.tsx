import { FC } from "react"

import HighlightedSuggestion from "../highlighted-suggestion/HighlightedSuggestion.component";
import { CategoryItem } from "../../../store/categories/Category.types";

import { SearchResultContainer, ResultList, ResultLink } from "./SearchResult.styles"

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
                            <ResultList>
                                <HighlightedSuggestion searchTerm={searchTerm} suggestion={suggestion.product.name} />
                            </ResultList>
                        </ResultLink>)
                }
                { filteredProductsName.length === 0 && (
                        <ResultList>No results found...</ResultList>
                    )
                }
            </SearchResultContainer>
    )
}

export default SearchResult