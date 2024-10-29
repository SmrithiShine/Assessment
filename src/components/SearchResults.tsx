import React from 'react';

interface SearchResultsProps {
    results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className="search-results">
           {results.length > 0 ? (
               results.map((result, index) => (
                   <div key={index} className="result-item">
                       <h3 dangerouslySetInnerHTML={{ __html: result.title }}></h3>
                       <p dangerouslySetInnerHTML={{ __html: result.content}}></p>
                    </div>
               ))
           ): (
               <p>No results found</p>
           )} 
        </div>
    );
};

export default SearchResults;