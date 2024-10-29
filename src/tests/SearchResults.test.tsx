import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from '../components/SearchResults';

const mockResults = [
    { title: 'Result_1', content: 'This is a sample result for testing.' },
    { title: 'Result_2', content: 'Another example result for search.' },
];

test('renders search results', () => {
    render(<SearchResults results={mockResults} />);

    const result1 = screen.getByText(/Result_1/i);
    const result2 = screen.getByText(/Result_2/i);

    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
});

test('display "No results found" when results are empty', () => {
    render(<SearchResults results={[]} />);

    const noResultsMessage = screen.getByText(/No results found/i);
    expect(noResultsMessage).toBeInTheDocument();
});

