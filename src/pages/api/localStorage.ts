export function saveClientsToStorage(clients: Customer[]) {
    localStorage.setItem('clients', JSON.stringify(clients));
}

export function loadClientsFromStorage(): Customer[] | undefined {
    const data = localStorage.getItem('clients');
    if (data) {
        return JSON.parse(data) as Customer[];
    }
    return undefined;
}