interface TableProps {
    clients: Customer[];
    onSort?: (field: string) => void;
    onSave: (editedClient: Customer) => void;
}