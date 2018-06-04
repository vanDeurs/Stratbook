// This handles errors
export const handleErrors = (response) => {
    if (!response.ok) throw new Error(response.statusText);
        return response;
};
    
// This handles fetching errors
export const fetchWithErrorHandling = (input, init) => {
    return fetch(input, init)
    .then(this.handleErrors)
};