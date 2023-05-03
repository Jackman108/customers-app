import { Modal, useModal, Button, Text, Collapse, Input } from "@nextui-org/react";
import React, { useState } from "react";
import styles from './ClientModal.module.css'
import CollapseForm from "../Collapse/CollapseForm";

interface ClientModalProps {
    onCreate: (client: Customer) => void;
    onClose: () => void;
    bindings?: { open: boolean; onClose: () => void; };
}

function ClientModal({ onCreate, onClose, bindings = { open: false, onClose } }: ClientModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deferralDays, setDeferralDays] = useState<number>(0);
    const [creditLimit, setCreditLimit] = useState<number>(0);

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
            credit_limit: creditLimit,
            org: {
                id: '',
                name: '',
                inn: '',
                kpp: '',
                ogrn: '',
                addr: '',
                bank_accounts: [{
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
        setDeferralDays(0);
        setCreditLimit(0);
    };
    
    return (
        <Modal
            className={styles.modalWindow}
            scroll
            width="600px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Добавление клиента
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Collapse.Group>
                        <Collapse title="Детали Клиента:">
                            <Input
                                label="Имя:"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                autoFocus
                            />
                            <Input
                                label="Email:"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <Input
                                label="Отсрочка (дни):"
                                type="number"
                                min="0"
                                step="1"
                                value={deferralDays.toString()}
                                onChange={(event) => setDeferralDays(Math.max(Number(event.target.value), 0))}
                                required
                            />
                            <Input
                                label="Кредитный лимит:"
                                type="number"
                                min="0"
                                step="1"
                                value={creditLimit.toString()}
                                onChange={(event) => setCreditLimit(Math.max(Number(event.target.value), 0))}
                                required
                            />
                        </Collapse>
                    </Collapse.Group>
                    <CollapseForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={onClose}>
                        Close
                    </Button>
                    <Button auto type="submit" onPress={onClose}
                    >
                        Agree
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ClientModal;
