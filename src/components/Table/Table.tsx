import React, { useState, useEffect } from 'react';
import styles from './Table.module.css'
import { FaCopy } from 'react-icons/fa';


interface TableProps {
    clients: Customer[];
    onSort?: (field: keyof Customer) => void;
    onSave: (editedClient: Customer) => void;
}

const Table: React.FC<TableProps> = ({ clients = [], onSort }) => {
    const COLUMNS = [
        { field: 'name', header: 'Имя' },
        { field: 'id', header: 'ID' },
        { field: 'email', header: 'Email' },
        { field: 'deferral_days', header: 'Отсрочка оплаты' },
        { field: 'created_at', header: 'Создан' },
        { field: 'updated_at', header: 'Изменен' },
    ];
    // Состояние для хранения информации о том, был ли скопирован клиент
    const [isCopied, setCopied] = useState(false);
    // Состояние для хранения текущего поля сортировки
    const [sortField, setSortField] = useState<string>('');
    // Состояние для хранения текущего порядка сортировки
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Функция для обработки события клика на иконку копирования
    const handleCopy = (client: Customer) => {
        const text = `Имя: ${client.name}, Email: ${client.email}, Отсрочка: ${client.deferral_days}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

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
    // Сортированный массив клиентов
    const sortedClients = React.useMemo(() => {
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
                            <td className={styles.tableCell}>{new Date(client.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            <td className={styles.tableCell}>{new Date(client.updated_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {isCopied && <span className={styles.copyText} >Скопировано в буфер</span>}
        </>
    );
};

export default Table;