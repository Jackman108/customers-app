import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    const server = new Server({
        environment,

        seeds(server) {
            server.db.loadData({
                customers: [
                    {
                        id: "x78i14-gzidv",
                        name: "Test11",
                        email: "фывфыв@gmail.com",
                        deferral_days: 14,
                        credit_limit: 14,
                        org: {
                            id: "131b9d78-ad58-415f-aab4-779a9e87edfd",
                            name: "Название организации",
                            inn: "7709655212",
                            kpp: "772901001",
                            ogrn: "1026101794313",
                            addr: "Юридический адрес",
                            bank_accounts: [
                                {
                                    id: "c0ca02e9-be90-456b-b77c-82189c7651ae",
                                    name: "2",
                                    bik: "123456783",
                                    account_number: "12345678901234567891",
                                    corr_account_number: "09876543210987654321",
                                    is_default: true,
                                    created_at: "2023-03-31T13:27:06Z",
                                    updated_at: "2023-03-31T13:35:58Z",
                                },
                                {
                                    id: "23c3a0d6-c13f-45b1-9143-ef27af1b6d44",
                                    name: "Название1",
                                    bik: "123456783",
                                    account_number: "12345678901234567890",
                                    corr_account_number: "09876543210987654321",
                                    is_default: false,
                                    created_at: "2023-03-31T13:27:06Z",
                                    updated_at: "2023-03-31T13:35:58Z",
                                },
                            ],
                        },
                    },
                ],
            });
        },

        routes() {
            this.namespace = "api";

            this.get("/customers", (schema) => {
                return schema.db.customers;
            });

            this.post("/customers", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                const newCustomer = schema.db.customers.insert(attrs);
                return newCustomer;
            });

            this.put("/customers/:id", (schema, request) => {
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody);
                const customer = schema.db.customers.find(id);
                return customer.update(attrs);
            });

            this.delete("/customers/:id", (schema, request) => {
                const id = request.params.id;
                const customer = schema.db.customers.find(id);
                return customer.destroy();
            });
        },
    });

    return server;
}
