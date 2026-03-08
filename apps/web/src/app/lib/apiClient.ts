export const API_URL = 'http://localhost:3000';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let errorMsg = response.statusText;
        try {
            const errorData = await response.json();
            if (errorData.message) {
                errorMsg = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
            }
        } catch {
            // Ignore if not JSON
        }
        throw new Error(errorMsg || 'An unknown error occurred while communicating with the server.');
    }

    return response.json();
}
