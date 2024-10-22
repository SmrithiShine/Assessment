import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

    /*useEffect(() => {
        if (query.length > 0) {
            fetchSuggestions();
        } else{
            setSuggestions([]);
        }
    }, [query]);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(
                'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json'
            );

            setSuggestions(response.data.suggestion);
            setShowSuggestions(true);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSearch = async (searchTerm: string) => {
        setQuery(searchTerm);
        setShowSuggestions(false);
        try{
            const response = await axios.get(
                'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json'
            );
            setResults(response.data.results);
        }
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (event.key === 'ArrowUp'){
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (event.key === 'Enter' && selectedIndex >= 0) {
            handleSearch(suggestions[selectedIndex]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSearch(suggestion);
    };

    return (
        <div>
            <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} />

            {query.length > 0 && (
                <button onClick={() => setQuery('')}>X</button>
            )}
            {showSuggestions && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}
                        style={{
                            backgroundColor: selectedIndex === index ? 'lightgray' : 'white',
                        }} >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        <div>
            {results.map((result, index) => (
                <div key={index}>{result}</div>
            ))}
        </div>
    </div>

    );
/*
    const highlightQuery = (text: string) => {
        // eslint-disable-next-line no-template-curly-in-string
        const parts = text.split(new RegExp('(${query})', 'gi'));
        return(
            <span>
                {parts.map((part, index) => 
                part.toLowerCase() === query.toLowerCase() ? (
                    <mark key={index}>{part}</mark>
                ): (
                    part
                )
                )}
            </span>
        );
    };

    return(
        <div>
            <input type="text" value={query} onChange={handleInputChange} onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            />
            <button onClick={handleSearch}>Search</button>
        <div>
        {results.map((result, index) => (
            <div key={index}>{highlightQuery(result)}</div>
        ))}
        </div>
        </div>
    );*/

    const fetchSuggestions = async (term: string) => {
        if (term) {
            try {
                const response = await axios.get('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json');
                setSuggestions(response.data.suggestions);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await axios.get('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json', { params: { q: query }});
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        fetchSuggestions(event.target.value);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
        fetchSearchResults(suggestion);
    }

    const handleSearchClick = () => {
        if (searchTerm) {
            fetchSearchResults(searchTerm);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setSelectedSuggestionIndex((prevIndex) => prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex);
        } else if (event.key === 'ArrowUp') {
            setSelectedSuggestionIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0);
        } else if (event.key === 'Enter') {
            if (selectedSuggestionIndex >= 0 && suggestions.length > 0) {
                handleSuggestionClick(suggestions[selectedSuggestionIndex]);
            } else {
                handleSearchClick();
            }
        }
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input type="text" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Search..." />
                <button onClick={handleSearchClick}>Search</button>

                {showSuggestions && suggestions.length > 0 && (
                    <ul className = "suggestions-dropdown">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className={index === selectedSuggestionIndex ? 'selected': ''}
                            onClick={() => handleSuggestionClick(suggestion)} >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => <div key={index}>{result.name}</div>)
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;