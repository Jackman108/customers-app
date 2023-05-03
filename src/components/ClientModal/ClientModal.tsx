import { Modal, Spacer, Table, Button, Text, Collapse, Input } from "@nextui-org/react";
import React, { useState } from "react";

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
        console.log('handleSubmit called');
        console.log(name, email, deferralDays, creditLimit);


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
                    created_at: new Date().toString(),
                    updated_at: new Date().toString(),
                }],
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
            },
            metadata: {
                key: '',
                volume: '',
            },
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
        };

        onCreate(client);
        setName('');
        setEmail('');
        setDeferralDays(0);
        setCreditLimit(0);
    };

    return (
        <Modal
            scroll
            blur
            width="800px"
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
                    <Collapse.Group >
                        <Collapse expanded title="Детали Клиента:">
                            <Input
                                id="1"
                                label="Имя:"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                bordered
                                clearable
                                width="400px"
                                size="lg"
                                autoFocus
                            />
                            <Spacer x={1.5} />
                            <Input
                                id="2"
                                label="Email:"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                bordered
                                clearable
                                width="400px"
                                size="lg"
                            />
                            <Spacer y={1.5} />
                            <Input
                                id="3"
                                label="Отсрочка (дни):"
                                type="number"
                                min="0"
                                step="1"
                                value={deferralDays.toString()}
                                onChange={(event) => setDeferralDays(Math.max(Number(event.target.value), 0))}
                                required
                                bordered
                                clearable
                                width="400px"
                                size="lg"
                            />
                            <Spacer y={1.5} />
                            <Input
                                id="4"
                                label="Кредитный лимит:"
                                type="number"
                                min="0"
                                step="1"
                                value={creditLimit.toString()}
                                onChange={(event) => setCreditLimit(Math.max(Number(event.target.value), 0))}
                                required
                                bordered
                                clearable
                                width="400px"
                                size="lg"
                            />
                        </Collapse>
                    </Collapse.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={onClose}>
                        Close
                    </Button>
                    <Button auto type="submit" onSubmit={onClose} >
                        Agree
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ClientModal;
