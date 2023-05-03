export function saveClientsToStorage(clients: Customer[]) {
    const parsedClients = clients.map((client) => {
        if (!client.org || !client.org.bank_accounts) {
            return client;
        }
        return {
            ...client,
            org: {
                ...client.org,
                bank_accounts: client.org.bank_accounts?.map((account) => ({
                    ...account,
                    created_at: new Date(account.created_at).toISOString(),
                    updated_at: new Date(account.updated_at).toISOString(),
                })),
            },
        };
    });
    localStorage.setItem('clients', JSON.stringify(parsedClients));
}

export function loadClientsFromStorage(): Customer[] | undefined {
    const data = localStorage.getItem("clients");
    if (data) {
        const parsedClients = JSON.parse(data) as Customer[];
        return parsedClients.map((client) => {
            if (!client.org || !client.org.bank_accounts) {
                return client;
            }
            return {
                ...client,
                org: {
                    ...client.org,
                    bank_accounts: client.org.bank_accounts?.map((account) => ({
                        ...account,
                        created_at: new Date(account.created_at).toISOString(),
                        updated_at: new Date(account.updated_at).toISOString(),
                    })),
                },
            };
        });
    }
    return undefined;
}