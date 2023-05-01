import React, { useState, useEffect } from 'react';
import styles from './Table.module.css'
import { FaCopy } from 'react-icons/fa';


interface TableProps {
    clients?: Customer[];
    onSort?: (field: string) => void;
    onSave: (editedClient: Customer) => void;
}

const Table: React.FC<TableProps> = ({ clients = [], onSort, onSave }) => {
    const COLUMNS = [
        { field: 'name', header: 'Имя' },
        { field: 'id', header: 'ID' },
        { field: 'email', header: 'Email' },
        { field: 'deferral_days', header: 'Отсрочка оплаты' },
        { field: 'created_at', header: 'Создан' },
        { field: 'updated_at', header: 'Изменен' },
    ];
    const [isCopied, setCopied] = useState(false);

    const handleCopy = (client: Customer) => {
        const text = `Имя: ${client.name}, Email: ${client.email}, Отсрочка: ${client.deferral_days}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    //состояния для хранения текущего поля сортировки
    const [sortField, setSortField] = useState<string>('');
    //состояния для хранения текущего порядка сортировки 
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    // функция для обработки события клика на заголовок колонки таблицы
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        if (onSort) {
            onSort(field);
        }
    };

    const sortedClients = React.useMemo(() => {
        if (!sortField) {
            return clients;
        }
        const sorted = [...clients].sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    }, [clients, sortField, sortOrder]);

    const handleSave = (field: string, editedClient: Customer) => {
        const updatedClient = { ...editedClient, [field]: editedClient[field] };
        onSave(updatedClient);
    };

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr className={styles.tableRow}>
                        {COLUMNS.map(({ field, header }) => (
                            <th key={field} onClick={() => handleSort(field)} className={styles.tableHeadCell}>
                                <span className={styles.headerText}>{header}</span>
                                {sortField === field && (
                                    <span className={styles.sortArrow}>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {sortedClients.map((client) => (
                        <tr key={client.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>{client.name}</td>
                            <td className={styles.tableCell}>
                                {client.id}
                                <FaCopy onClick={() => handleCopy(client)} className={styles.copyIcon} />
                            </td>
                            <td className={styles.tableCell}>{client.email}</td>
                            <td className={styles.tableCell}>{client.deferral_days}</td>
                            <td className={styles.tableCell}>{new Date(client.created_at).toLocaleDateString()}</td>
                            <td className={styles.tableCell}>{new Date(client.updated_at).toLocaleDateString()}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {isCopied && <span className={styles.copyText} >Скопировано в буфер</span>}
        </>
    );
};

export default Table;