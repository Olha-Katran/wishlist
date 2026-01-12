const BASE_URL = 'http://localhost:3001';

export const useApi = () => {
    const request =async <T> (
        endpoint: string,
        options?: RequestInit
    ): Promise<T> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
    };
    return { request };
}