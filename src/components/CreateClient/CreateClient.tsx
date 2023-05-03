import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateClient.module.css'

const CreateClient: React.FC<CreateClientProps> = ({ onCreate, onClose, modalRoot = document.body }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deferralDays, setDeferralDays] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        function generateRandomString(length: number) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const client: Customer = {
            id: generateRandomString(10),
            name,
            email,
            deferral_days: deferralDays,
            org: {
                id: '',
                name: '',
                inn: '',
                kpp: '',
                ogrn: '',
                addr: '',
                bank_accounts: [ {
                    id: '',
                    name: '',
                    bik: '',
                    account_number: '',
                    corr_account_number: '',
                    is_default: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }]
            }
        };
        onCreate(client);
        setName('');
        setEmail('');
        setDeferralDays(Number);
    };
    const handleClose = () => {
        onClose();
    };
    if (!modalRoot) {
        return null;
    }
    return ReactDOM.createPortal(
        <>
            <div className={styles.modalOverlay} onClick={handleClose} />
            <div className={styles.modalWindow}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Создание Цены</h2>
                    <button className={styles.modalCloseButton} onClick={handleClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Имя:
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Отсрочка (дни):
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={deferralDays.toString()}
                            onChange={(event) => setDeferralDays(Math.max(Number(event.target.value), 0))}
                            required
                        />
                    </label>
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </>,
        modalRoot
    );
};

export default CreateClient;