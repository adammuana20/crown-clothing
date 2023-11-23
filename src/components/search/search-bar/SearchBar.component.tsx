import { useState, ChangeEvent, useRef, useEffect } from "react"

import { FaSearch } from 'react-icons/fa'

import FormInput from "../../form-input/FormInput.component"
import SearchResults from "../search-results/SearchResults.component"
import { SearchBarContainer } from "./SearchBar.styles"

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchFieldString = e.target.value.toLocaleLowerCase()
        const searchFieldResults = e.target.value

        setSearchTerm(searchFieldString)
        setShowResults(searchFieldResults.length > 0)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {            
          // Clicked outside the input
          setShowResults(false);
        }
    };

    useEffect(() => {
        if(showResults) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showResults]);

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
                    placeholder: 'Search',
                    autoComplete: 'off',
                    ref: inputRef,
                }}
            />
            {showResults && <SearchResults searchTerm={searchTerm} />}
        </SearchBarContainer>
    )
}

export default SearchBar