import { useState, ChangeEvent } from "react"

import { FaSearch } from 'react-icons/fa'

import FormInput from "../form-input/FormInput.component"
import SearchResults from "../search-results/SearchResults.component"
import { SearchBarContainer } from "./SearchBar.styles"

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showResults, setShowResults] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchFieldString = e.target.value.toLocaleLowerCase()
        const searchFieldResults = e.target.value

        setSearchTerm(searchFieldString)
        setShowResults(searchFieldResults.length > 0)
    }

    return (
        <SearchBarContainer>
            <FaSearch id='search-icon'/>
            <FormInput 
                inputOptions={{
                    type:'search',
                    onChange:handleChange,
                    name:'search',
                    value:searchTerm,
                    'data-search': true,
                    placeholder: 'Search'
                }}
            />
            {showResults && <SearchResults searchTerm={searchTerm} />}
        </SearchBarContainer>
    )
}

export default SearchBar