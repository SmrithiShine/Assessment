import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { fetchSearchResults } from './utils/api';
import './App.css';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    const  results = await fetchSearchResults(query);
    setSearchResults(results);
  };

  return (
    <div className="App">
      <h1>Search Application</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default App;
