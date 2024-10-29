import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';
import * as api from '../utils/api';

jest.mock('../utils/api');

const mockedFetchSuggestions = api.fetchSuggestions as jest.Mock;
 beforeEach(() => {
    mockedFetchSuggestions.mockReset();
 });

test('renders SearchBar and handles input', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');
});

test('shows suggestions when typing in search bar', async () => {
    const handleSearch = jest.fn();
    const mockSuggestions = ["apple", "banana", "orange"];
    mockedFetchSuggestions.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'ap' } });

    expect(await screen.findByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('orange')).toBeInTheDocument();
});

test('clears input and hides suggestions on "X" button click', async () => {
    const handleSearch = jest.fn();
    const mockSuggestions = ["apple", "banana"];
    mockedFetchSuggestions.mockResolvedValue(mockSuggestions);

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'ap' } });

    expect(await screen.findByText('apple')).toBeInTheDocument();

    const clearButton = screen.getByText('X');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
    expect(screen.queryByText('banana')).not.toBeInTheDocument();
});
