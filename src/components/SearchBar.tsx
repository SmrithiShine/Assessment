import React, { useState } from 'react';
import Typeahead from './Typeahead';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  
  const handleClear = () => {
    setQuery('');
  };

  
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {query && <button className="clear-button" onClick={handleClear}>X</button>}
      <button className="search-button" onClick={() => onSearch(query)}>Search</button>

      
      <Typeahead query={query} onSuggestionSelect={handleSuggestionSelect} />
    </div>
  );
};

export default SearchBar;


/*import React, { useState, useEffect } from 'react';
import { fetchSuggestions } from '../utils/api';
import Typeahead from './Typeahead';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const getSuggestions = async () => {
            if (query.length >= 2) {
                const results = await fetchSuggestions(query);
                setSuggestions(results.slice(0, 6));
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        };
        getSuggestions();
    }, [query]);

    const handleSearch = () => {
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        handleSearch();
    };

    return (
        <div className="search-bar">
            <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search..." />
            {query.length > 0 && <button onClick={handleClear}>X</button>}
            <button className="search-button" onClick={handleSearch}>Search</button>

            {showSuggestions && (
               <Typeahead suggestions={suggestions} onSelect={handleSelectSuggestion} />
            )}
        </div> 
    );
};

export default SearchBar;*/