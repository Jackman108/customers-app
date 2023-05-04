import { Modal, Button, Text, Container, Collapse, Spacer } from "@nextui-org/react";
import React, { useState, FormEvent } from "react";
import ClientDetails from "../Collapse/ClientDetails";
import OrganizationDetails from "../Collapse/OrganizationDetails";
import generateRandomString from "../helpers/randomString";
interface ClientModalProps {
    onCreate: (client: Customer) => void;
    onClose: () => void;
    bindings?: { open: boolean; onClose: () => void; };
}

function ClientModal({ onCreate, onClose, bindings = { open: false, onClose } }: ClientModalProps) {
    const [id, setId] = useState<string>(generateRandomString(10));
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [deferralDays, setDeferralDays] = useState<number>(0);
    const [creditLimit, setCreditLimit] = useState<number>(0);
    const [orgName, setOrgName] = useState<string>('');
    const [inn, setInn] = useState<string>('');
    const [kpp, setKpp] = useState<string>('');
    const [ogrn, setOgrn] = useState<string>('');
    const [addr, setAddress] = useState<string>('');
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('handleSubmit called');
        console.log(name, email, deferralDays, creditLimit, orgName, inn, kpp, ogrn, addr);

        const formIsValid =
            name.trim() !== "" &&
            email.trim() !== "" &&
            deferralDays > 0 &&
            creditLimit > 0 &&
            orgName.trim() !== "" &&
            inn.trim() !== "" &&
            kpp.trim() !== "" &&
            ogrn.trim() !== "" &&
            addr.trim() !== "";
        if (formIsValid) {
            const id = generateRandomString(10);
            const newDate = new Date().toString();

            const client: Customer = {
                id,
                name,
                email,
                deferral_days: deferralDays,
                credit_limit: creditLimit,
                org: {
                    id,
                    name,
                    inn,
                    kpp,
                    ogrn,
                    addr,
                    bank_accounts: [{
                        id,
                        name: '',
                        bik: '',
                        account_number: '',
                        corr_account_number: '',
                        is_default: true,
                        created_at: newDate,
                        updated_at: newDate,
                    }],
                    created_at: newDate,
                    updated_at: newDate,
                },
                metadata: {
                    key: '',
                    volume: '',
                },
                created_at: newDate,
                updated_at: newDate,
            };
            onCreate(client);
            setName('');
            setEmail('');
            setDeferralDays(0);
            setCreditLimit(0);
            setOrgName('');
            setInn('');
            setKpp('');
            setOgrn('');
            setAddress('');
            setFormIsValid(false);
            onClose();
        }
    };
    return (
        <Modal
            scroll={false}
            blur
            width="900px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
            autoMargin={true}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Добавление клиента
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body                  
                >
                    <Container id="modal-description">
                        <Collapse.Group >
                            <ClientDetails
                                id={id}
                                name={name}
                                email={email}
                                deferralDays={deferralDays}
                                creditLimit={creditLimit}
                                onNameChange={setName}
                                onEmailChange={setEmail}
                                onDeferralDaysChange={setDeferralDays}
                                onCreditLimitChange={setCreditLimit}
                            />
                            <Spacer y={1.5} />
                            <OrganizationDetails
                                id={id}
                                name={orgName}
                                inn={inn}
                                kpp={kpp}
                                ogrn={ogrn}
                                addr={addr}
                                onNameChange={setOrgName}
                                onInnChange={setInn}
                                onKppChange={setKpp}
                                onOgrnChange={setOgrn}
                                onAddressChange={setAddress}
                            />
                            <Spacer y={1.5} />
                        </Collapse.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={onClose}>
                        Close
                    </Button>
                    <Button                    
                    auto 
                    type="submit" 
                    onSubmit={onClose} >
                        Agree
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ClientModal;
