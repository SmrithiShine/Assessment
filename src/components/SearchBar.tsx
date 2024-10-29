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


