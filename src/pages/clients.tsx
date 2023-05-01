type Props = {
    client: Customer;
};

const Client: React.FC<Props> = ({ client }) => {
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.id}</td>
            <td>{client.email}</td>
            <td>{client.deferral_days}</td>
            <td>{client.created_at}</td>
            <td>{client.updated_at}</td>
        </tr>
    );
};

export default Client