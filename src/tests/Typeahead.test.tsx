import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

const mockSuggestions = ["apple", "banana", "orange"];

test('shows suggestions when typing in search bar', async () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'ap' } });

    mockSuggestions.forEach((suggestion) => {
        expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
});

test('clears input and hides suggestions on "X" button click', async () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'ap' } });
    const clearButton = screen.getByText('X');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    mockSuggestions.forEach((suggestion) => {
        expect(screen.queryByText(suggestion)).not.toBeInTheDocument();
    });
});