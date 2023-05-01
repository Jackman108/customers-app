const CLIENTS_KEY = 'clients';

export const loadClientsFromStorage = (): Customer[] => {
    try {
        const clients = JSON.parse(localStorage.getItem(CLIENTS_KEY) || '');
        return clients;
    } catch {
        return [];
    }
};
export const saveClientsToStorage = (clients: Customer[]) => {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients || []));
};