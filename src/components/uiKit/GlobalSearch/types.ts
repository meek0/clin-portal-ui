export interface ISuggestionPayload<T> {
    searchText: string;
    suggestions: T[]
}