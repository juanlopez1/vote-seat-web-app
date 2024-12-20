const getRequestHeaders = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const storageSession = localStorage.getItem('session');
    if (storageSession) {
        const session = JSON.parse(storageSession);
        headers.append('Authorization', `Bearer ${session.token}`);
    }
    return headers;
};

const processDefaultErrors = (response: Response) => {
    if (!response.ok) {
        if (response.status === 400) {
            throw new Error(`Bad request: ${response.status} `);
        }
        if (response.status === 404) {
            throw new Error(`Not found: ${response.status} `);
        }
        if (response.status >= 500) {
            throw new Error(`Server error: ${response.status} `);
        }
        throw new Error(`Failed to proceed: ${response.status}`);
    }
};

export async function httpGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${process.env.VOTE_SEAT_API_URL}${endpoint}`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });
    processDefaultErrors(response);
    return response.json();
}

export async function httpPost<T, K>(endpoint: string, body: T): Promise<K> {
    const response = await fetch(`${process.env.VOTE_SEAT_API_URL}${endpoint}`, {
        method: 'POST',
        headers: getRequestHeaders(),
        body: JSON.stringify(body),
    });
    processDefaultErrors(response);
    return response.json();
}
