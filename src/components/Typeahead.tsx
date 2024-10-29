import React, { useState, useEffect } from 'react';
import { fetchSuggestions } from '../utils/api';

interface TypeaheadProps {
  query: string;
  onSuggestionSelect: (suggestion: string) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ query, onSuggestionSelect }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  
  useEffect(() => {
    const fetchAndSetSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const results = await fetchSuggestions(query);
          console.log('Setting suggestions', results);
          setSuggestions(results);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]); 
      }
    };

    fetchAndSetSuggestions();
  }, [query]);

  return (
    <div className="typeahead" style={{ border: '1px solid black' }}>
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => onSuggestionSelect(suggestion)} style={{ cursor: 'pointer', padding: '4px', background: '#f9f9f9' }}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Typeahead;

/*import React from 'react';

interface TypeaheadProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ suggestions, onSelect }) => {
    if (suggestions.length === 0) return null;

    return (
        <ul className="typeahead-dropdown">
            {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => onSelect(suggestion)} className="typeahead-item">
                    {suggestion}
                </li>
            ))}
        </ul>
    );
};

export default Typeahead;*/