import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    const server = new Server({
        environment,   

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
