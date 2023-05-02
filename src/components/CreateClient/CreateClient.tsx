import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateClient.module.css'

type ClientProps = {
    onCreate: (client: Customer) => void;
    onClose: () => void;
    modalRoot?: Element;
};

const CreateClient: React.FC<ClientProps> = ({ onCreate, onClose, modalRoot = document.body }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deferralDays, setDeferralDays] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const client: Customer = {
            id: Math.floor(Math.random() * 1000),
            name,
            email,
            deferral_days: parseInt(deferralDays),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        onCreate(client);
        setName('');
        setEmail('');
        setDeferralDays('');
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
                            value={deferralDays}
                            onChange={(event) => setDeferralDays(event.target.value)}
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