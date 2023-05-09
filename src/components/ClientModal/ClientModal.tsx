import { Modal, Button, Text, Collapse, Spacer } from "@nextui-org/react";
import { FC, useState, FormEvent, memo } from "react";
import ClientDetails from "../Collapse/ClientDetails";
import OrganizationDetails from "../Collapse/OrganizationDetails";
import generateRandomString from "../helpers/randomString";
import BankAccountsForm from "../Collapse/BankAccountsForm";
import BackupEmails from "../Collapse/BackupEmails";
import MetaData from "../Collapse/MetaData";
interface ClientModalProps {
    handleAddClient: (client: Customer) => React.MouseEventHandler<HTMLButtonElement>;
    onClose: () => void;
    bindings?: { open: boolean; onClose: () => void; };
}
const MemoizedBankAccountsForm = memo(BankAccountsForm);

const ClientModal: FC<ClientModalProps> = ({
    handleAddClient,
    onClose,
    bindings = { open: false, onClose }
}): JSX.Element => {
    const id = generateRandomString(8);
    const newDate = new Date().toString();
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
        {
            id,
            name: "",
            account_number: "",
            bik: "",
            corr_account_number: "",
            is_default: true,
            created_at: newDate,
            updated_at: newDate,
        }
    ]);

    const [organization, setOrganization] = useState<OrgDetails>({
        id,
        name: "",
        inn: "",
        kpp: "",
        ogrn: "",
        addr: "",
        created_at: newDate,
        updated_at: newDate,
    });

    const [backupEmails, setBackupEmails] = useState<BackupEmail[]>([
        {
            id,
            email: "",
        }
    ]
    );

    const [data, setData] = useState<MetaData[]>([
        {
            key: newDate,
            value: newDate,
        }
    ]);
    const [clientDetails, setClientDetails] = useState<Customer>({
        id,
        name: "",
        email: "",
        deferral_days: 0,
        credit_limit: 0,
        created_at: newDate,
        updated_at: newDate,
        backupEmails: [],
        org: organization,
        metadata: []
    });
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('handleSubmit called',
            clientDetails, organization, bankAccounts, backupEmails, data);

        const validateMetaData = (data: MetaData[]): boolean => {
            return data.every((dataM: MetaData) => {
                const { key, value } = dataM || {};;
                return (
                    typeof key === 'string' && typeof value === 'string' && key.trim() !== '' && value.trim() !== ''
                );
            });
        };

        const validateBackupEmails = (backupEmails: BackupEmail[]): boolean => {
            return backupEmails.every((emails: BackupEmail) => {
                const { id, email } = emails || {};;
                return (
                    typeof id === 'string' && typeof email === 'string' && id.trim() !== '' && email.trim() !== ''
                );
            });
        };

        const validateBankAccounts = (bank: BankAccount[]): boolean => {
            return bank.every((account: BankAccount) => {
                const { id, name: bankName, account_number: accountNum, bik, corr_account_number: corrAccount, is_default: isDefault } = account || {};;
                return (
                    typeof id === 'string' &&
                    typeof bankName === 'string' &&
                    typeof accountNum === 'string' &&
                    typeof bik === 'string' &&
                    typeof corrAccount === 'string' &&
                    typeof isDefault === 'boolean' &&
                    id.trim() !== '' &&
                    bankName.trim() !== '' &&
                    accountNum.trim() !== '' &&
                    bik.trim() !== '' &&
                    corrAccount.trim() !== '' &&
                    isDefault !== false
                );
            });
        };

        const validateOrg = (organization: OrgDetails) => {
            const { id, name, inn, kpp, ogrn, addr } = organization || {};
            return (
                typeof id === 'string' &&
                typeof name === 'string' &&
                typeof inn === 'string' &&
                typeof kpp === 'string' &&
                typeof ogrn === 'string' &&
                typeof addr === 'string' &&
                name.trim() !== '' &&
                inn.trim() !== '' &&
                kpp.trim() !== '' &&
                ogrn.trim() !== '' &&
                addr.trim() !== ''
            );
        };
        const validateDetails = (clientDetails: Customer) => {
            const { id, name, email, deferral_days: deferralDays, credit_limit: creditLimit} = clientDetails || {};
            return (
                typeof id === 'string' &&
                typeof name === 'string' &&
                typeof email === 'string' &&
                typeof deferralDays === 'number' &&
                typeof creditLimit === 'number' &&
                id.trim() !== '' &&
                name.trim() !== '' &&
                email.trim() !== '' &&
                deferralDays >= 0 &&
                creditLimit >= 0
            );
        };

        const formIsValid =
            validateDetails(clientDetails) &&
            validateOrg(organization) &&
            validateBankAccounts(bankAccounts) &&
            validateBackupEmails(backupEmails) &&
            validateMetaData(data);

        

        if (formIsValid) {

            const metadata: MetaData[] = data.map(metaData => {
                return {
                    key: metaData.key,
                    value: metaData.value,
                };
            });
            const backupEmail: BackupEmail[] = backupEmails.map(backupEmails => {
                return {
                    id: backupEmails.id,
                    email: backupEmails.email,
                };
            });

            const bankAccountsArr: BankAccount[] = bankAccounts.map(bankAccount => {
                return {
                    id: bankAccount.id,
                    name: bankAccount.name,
                    bik: bankAccount.bik,
                    account_number: bankAccount.account_number,
                    corr_account_number: bankAccount.corr_account_number,
                    is_default: bankAccount.is_default,
                    created_at: newDate,
                    updated_at: newDate,
                };
            });

            const org: OrgDetails = {
                id: organization.id,
                name: organization.name,
                inn: organization.inn,
                kpp: organization.kpp,
                ogrn: organization.ogrn,
                addr: organization.addr,
                bank_accounts: bankAccountsArr,
                created_at: newDate,
                updated_at: newDate,
            };
            const customerDetails: Customer = {
                id: clientDetails.id,
                name: clientDetails.name,
                email: clientDetails.email,
                deferral_days: clientDetails.deferral_days,
                credit_limit: clientDetails.credit_limit,
                org: org,
                metadata: metadata,
                created_at: newDate,
                updated_at: newDate,
                backupEmails: backupEmail,
            };
            console.log('formIsValid');
            handleAddClient(customerDetails);
            setClientDetails({
                id,
                name: "",
                email: "",
                deferral_days: 0,
                credit_limit: 0,
                org: {
                    id,
                    name:"",
                    inn: "",
                    kpp: "",
                    ogrn: "",
                    addr: "",
                    bank_accounts: [{
                        id: generateRandomString(8),
                        name: "",
                        account_number: "",
                        bik: "",
                        corr_account_number: "",
                        is_default: true, 
                        created_at: newDate,
                        updated_at: newDate,                      
                    }],
                    created_at: newDate,
                    updated_at: newDate,
                },
                metadata: [{
                    key: "",
                    value: "",
                }],
                backupEmails: [{
                    id,
                    email: "",
                }],
                created_at: newDate,
                updated_at: newDate,
            });
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
                    <Collapse.Group splitted >
                        <ClientDetails
                            details={clientDetails}
                            onDetailsChange={setClientDetails}
                        />
                        <Spacer y={2} />
                        <OrganizationDetails
                            orgDetails={organization}
                            onOrgDetailsChange={setOrganization}
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
                        <MetaData
                            metaData={data}
                            onMetaChange={setData}
                        />
                        <Spacer y={2} />
                    </Collapse.Group>
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
