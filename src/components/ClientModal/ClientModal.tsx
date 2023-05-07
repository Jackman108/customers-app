import { Modal, Button, Text, Container, Collapse, Spacer } from "@nextui-org/react";
import React, { useState, FormEvent, memo } from "react";
import ClientDetails from "../Collapse/ClientDetails";
import OrganizationDetails from "../Collapse/OrganizationDetails";
import generateRandomString from "../helpers/randomString";
import BankAccountsForm from "../Collapse/BankAccountsForm";
import { BankAccountItems } from "../Collapse/BankAccountItem";
import BackupEmails from "../Collapse/SpareEmails";
interface ClientModalProps {
    handleAddClient: (client: Customer) => void;
    onClose: () => void;
    bindings?: { open: boolean; onClose: () => void; };
}
const MemoizedBankAccountsForm = memo(BankAccountsForm);

function ClientModal({ handleAddClient, onClose, bindings = { open: false, onClose } }: ClientModalProps): JSX.Element {
    const [id, setId] = useState<string>(generateRandomString(8));
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

    const [backupEmail, setBackupEmail] = useState<string>('');

    const [bankAccounts, setBankAccounts] = useState<BankAccountItems[]>([]);
    const [backupEmails, setBackupEmails] = useState<BackupEmail[]>([]);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('handleSubmit called');
        console.log(name, email, deferralDays, creditLimit, orgName, inn, kpp, ogrn, addr, bankAccounts, backupEmails);
        const validateBackupEmails = (backupEmails: BackupEmail[]): boolean => {
            return backupEmails.every((emails) => {
                const { id, email } = emails;
                return (
                    typeof id === 'string' &&
                    typeof email === 'string' &&
                    id.trim() !== '' &&
                    email.trim() !== ''
                );
            });
        };
        const validateBankAccounts = (bankAccounts: BankAccountItems[]): boolean => {
            return bankAccounts.every((account) => {
                const { name, accountNum, bik, corrAccount } = account;
                return (
                    typeof id === 'string' &&
                    typeof name === 'string' &&
                    typeof accountNum === 'string' &&
                    typeof bik === 'string' &&
                    typeof corrAccount === 'string' &&
                    typeof isDefault === 'boolean' &&
                    id.trim() !== '' &&
                    name.trim() !== '' &&
                    accountNum.trim() !== '' &&
                    bik.trim() !== '' &&
                    corrAccount.trim() !== '' &&
                    isDefault !== false
                );
            });
        };
        const validateDetails = () => {
            const customerFields = [
                name,
                email,
            ];
            const requiredFields = [...customerFields];
            return requiredFields.every((field) => field.trim() !== "");
        };
        const validateOrg = () => {
            const customerFields = [
                orgName,
                inn,
                kpp,
                ogrn,
                addr,
            ];
            const requiredFields = [...customerFields];
            return requiredFields.every((field) => field.trim() !== "");
        };
        const formIsValid =
            validateDetails() &&
            validateOrg() &&
            validateBankAccounts(bankAccounts) &&
            validateBackupEmails(backupEmails);
        if (formIsValid) {
            console.log('formIsValid');
            const newDate = new Date().toString();
            const backupEmail: BackupEmail[] = [{
                id,
                email: '',
            }];
            const bankAccountsArr: BankAccount[] = [{
                id,
                name: bankName,
                bik,
                account_number: accountNum,
                corr_account_number: corrAccount,
                is_default: isDefault,
                created_at: newDate,
                updated_at: newDate,
            }];
            const organization: Org = {
                id,
                name: orgName,
                inn,
                kpp,
                ogrn,
                addr,
                bank_accounts: bankAccountsArr,
                created_at: newDate,
                updated_at: newDate,
            };
            const client: Customer = {
                id,
                name,
                email,
                deferral_days: deferralDays,
                credit_limit: creditLimit,
                org: organization,
                metadata: {
                    key: '',
                    volume: '',
                },
                created_at: newDate,
                updated_at: newDate,
                backupEmails: backupEmail,
            };
            handleAddClient(client);
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
            setIsDefault(true);
            setBackupEmail('');
            setBankAccounts([]);
            setBackupEmails([]);
            setFormIsValid(false);
            onClose();
        }
    };
    return (
        <Modal
            {...bindings}
            scroll={false}
            blur
            width="900px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            autoMargin={true}
        >
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Добавление клиента
                    </Text>
                </Modal.Header>
                <Modal.Body>
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
                                accounts={bankAccounts}
                                onAccountsChange={setBankAccounts}
                            />
                            <Spacer y={2} />
                            <BackupEmails
                                emails={backupEmails}
                                onEmailsChange={setBackupEmails}
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
                        onSubmit={onClose}>
                        Agree
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
export default ClientModal;
