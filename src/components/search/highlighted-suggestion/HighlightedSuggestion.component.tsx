import { FC } from "react"
import { Highlighted } from "./HighlightedSuggestion.styles";

type HighlightedSuggestionProps = {
    searchTerm: string;
    suggestion: string;
}

const HighlightedSuggestion: FC<HighlightedSuggestionProps> = ({ searchTerm, suggestion }) => {
    const parts = suggestion.split(new RegExp(`(${searchTerm})`, 'gi'))

    return (
        <span>
            { parts.map((part, i) => (
                part.toLocaleLowerCase() === searchTerm.toLocaleLowerCase() ? (
                    <Highlighted key={i}>
                        {part}
                    </Highlighted>
                ) : (
                    part
                )
            ))
            }
        </span>
    )
}

export default HighlightedSuggestion