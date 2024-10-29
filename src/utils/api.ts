export const fetchSearchResults = async (query: string) => {
    console.log('Fetching suggestions for:', query);
    const response = await fetch('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json');
    const data =  await response.json();
    console.log('Received suggestions:', data);
    return data;
};

export const fetchSuggestions = async (query: string) => {
    console.log('Fetching suggestions for:', query);
    const response = await fetch('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json');
    const data =  await response.json();
    console.log('Received suggestions:', data);
    return data;
};