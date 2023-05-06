import { Modal, Button, Text, Container, Collapse, Spacer } from "@nextui-org/react";
import React, { useState, FormEvent, memo } from "react";
import ClientDetails from "../Collapse/ClientDetails";
import OrganizationDetails from "../Collapse/OrganizationDetails";
import generateRandomString from "../helpers/randomString";
import BankAccounts, { BankAccount } from "../Collapse/BankAccounts";
import BankAccountsForm from "../Collapse/BankAccountsForm";
interface ClientModalProps {
    onCreate: (client: Customer) => void;
    onClose: () => void;
    onAddAccount: () => void;
    bindings?: { open: boolean; onClose: () => void; };
}
const MemoizedBankAccountsForm = memo(BankAccountsForm);
function ClientModal({ onAddAccount, onCreate, onClose, bindings = { open: false, onClose } }: ClientModalProps): JSX.Element {
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
    const [bankName, setBankName] = useState<string>('');
    const [accountNum, setAccountNum] = useState<string>('');
    const [bik, setBik] = useState<string>('');
    const [corrAccount, setCorrAccount] = useState<string>('');
    const [isDefault, setIsDefault] = useState<boolean>(true);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);


    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('handleSubmit called');
        console.log(name, email, deferralDays, creditLimit, orgName, inn, kpp, ogrn, addr, bankName, accountNum, bik, corrAccount, isDefault,);
        const validateForm = () => {
            const requiredFields = [
                name,
                email,
                orgName,
                inn,
                kpp,
                ogrn,
                addr,
                bankName,
                accountNum,
                bik,
                corrAccount,
            ];
            return requiredFields.every((field) => field.trim() !== "");
        };
        const formIsValid = isDefault !== (false) && deferralDays > 0 && creditLimit > 0 && validateForm();
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
                    name: orgName,
                    inn,
                    kpp,
                    ogrn,
                    addr,
                    bank_accounts: [{
                        id,
                        name: bankName,
                        bik,
                        account_number: accountNum,
                        corr_account_number: corrAccount,
                        is_default: isDefault,
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
            setBankName('');
            setAccountNum('');
            setBik('');
            setCorrAccount('');
            setIsDefault(true)
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
                            <Spacer y={2} />
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
                            <Spacer y={2} />
                            <MemoizedBankAccountsForm                            
                            onAccountsChange={setBankAccounts} 
                            accounts={bankAccounts}
                            />
                            <Spacer y={2} />
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
