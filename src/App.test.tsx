import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from './utils/api';
import App from './App';

jest.mock('./utils/api');

const mockedFetchSuggestions = api.fetchSuggestions as jest.Mock;
const mockedFetchSearchResults = api.fetchSearchResults as jest.Mock;

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    mockedFetchSuggestions.mockReset();
    mockedFetchSearchResults.mockReset();
 });

 test('renders the App with SearchBar and SearchResults components', () => {
   render(<App />);

   expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
   expect(screen.getByRole('button', { name: /search.../i })).toBeInTheDocument();
 });

 test('displays suggestions when typing ein the search bar', async () => {
   const mockSuggestions = ['apple', 'banana', 'orange'];
   mockedFetchSuggestions.mockResolvedValue(mockSuggestions);

   render (<App />);

   const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'ap' } });

    expect(await screen.findByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('orange')).toBeInTheDocument();
});

test('fetches and displays search results when the search button is clicked', async () => {
  const mockResults = [
    { title: 'Result_1', content: 'This is a sample result for testing.' },
    { title: 'Result_2', content: 'Another example result for search.' },
  ];
  mockedFetchSearchResults.mockResolvedValue(mockResults);

  render (<App />);

  const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search.../i }));

    expect(await screen.findByText(/Result_1/i)).toBeInTheDocument();
    expect(screen.getByText(/Result_2/i)).toBeInTheDocument();
});

test('clears the search input and hides suggestions on "X" button click', async () => {
  const mockSuggestions = ["apple", "banana"];
  mockedFetchSuggestions.mockResolvedValue(mockSuggestions);

  render(<App />);

  const input = screen.getByPlaceholderText(/search.../i);
  fireEvent.change(input, { target: { value: 'ap' } });

  expect(await screen.findByText('apple')).toBeInTheDocument();

  fireEvent.click(screen.getByText('X'));

  expect(input).toHaveValue('');
  expect(screen.queryByText('apple')).not.toBeInTheDocument();
  expect(screen.queryByText('banana')).not.toBeInTheDocument();
});
});

