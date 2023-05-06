import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Collapse, Container, Spacer } from '@nextui-org/react';
import generateRandomString from '../helpers/randomString';
import BankAccountItem, { BankAccountItemProps, BankAccountProps } from './BankAccountItem';

interface BankAccountsFormProps {
    accounts: BankAccountItemProps['account'][];
    onAccountsChange: (updatedAccounts: BankAccountItemProps['account'][]) => void;
}

const BankAccountsForm: React.FC<BankAccountsFormProps> = ({
    accounts,
    onAccountsChange
}) => {
    const [defaultAccountBlocked, setDefaultAccountBlocked] = useState(() => {
        return accounts.length > 1 ? accounts.some((account) => account.isDefault) : false;
    });
    const [activeAccountId, setActiveAccountId] = useState(
        accounts.length > 0 ? accounts[0].id : '');

    useEffect(() => {
        if (accounts.length === 0) {
            const newAccount: BankAccountProps = {
                id: generateRandomString(8),
                name: '',
                accountNum: '',
                bik: '',
                corrAccount: '',
                isDefault: accounts.length === 0,
            };
            setDefaultAccountBlocked(true);
            onAccountsChange([newAccount]);
        } else if (accounts.length > 0 && accounts[0].isDefault) {
            const newAccounts = [...accounts];
            const addedAccount = newAccounts.find((account) => !account.isDefault);
            if (addedAccount) {
                addedAccount.isDefault = false;
                setDefaultAccountBlocked(accounts[0].isDefault);
                onAccountsChange(newAccounts);
            }
        }
    }, [accounts, onAccountsChange]);

    const handleAddAccountClick = () => {
        const newAccount: BankAccountProps = {
            id: generateRandomString(8),
            name: '',
            accountNum: '',
            bik: '',
            corrAccount: '',
            isDefault: false,
        };
        const newAccounts = [...accounts, newAccount];
        setDefaultAccountBlocked(false);
        onAccountsChange(newAccounts);
    };

    const handleAccountChange = useCallback(
        (updatedAccount: BankAccountItemProps['account']) => {
            const accountIndex = accounts.findIndex((account) => account.id === updatedAccount.id);
            const newAccounts = [...accounts];
            newAccounts[accountIndex] = updatedAccount;
            onAccountsChange(newAccounts);
        },
        [accounts, onAccountsChange],
    );

    const handleSwitchChange = useCallback(
        (id: string, isDefault: boolean) => {
            const accountIndex = accounts.findIndex((account) => account.id === id);
            if (accountIndex === -1) {
                return;
            }
            const newAccounts: BankAccountProps[] = [...accounts];
            newAccounts.forEach((account) => (account.isDefault = false));
            newAccounts[accountIndex].isDefault = isDefault;
            setDefaultAccountBlocked(!isDefault);
            onAccountsChange(newAccounts);
        },
        [accounts, onAccountsChange],
    );

    const handleDeleteAccount = useCallback((id: string) => {
        const deletedAccount = accounts.find((account) => account.id === id);
        const newAccounts: BankAccountProps[] = accounts.filter((account) => account.id !== id);
        if (deletedAccount && deletedAccount.isDefault) {
            newAccounts[0].isDefault = true;
        }
        setActiveAccountId(newAccounts.length > 0 ? newAccounts[0].id : '');
        onAccountsChange(newAccounts);
    }, [accounts, onAccountsChange]);

    return (
        <Collapse expanded title="Банковские счета:">
            {accounts.map((account, index) => (
                <Container key={account.id} title={account.name}>
                    <BankAccountItem
                        account={account}
                        onAccountChange={handleAccountChange}
                        onSwitchChange={handleSwitchChange}
                    />
                    {accounts.length > 1 && index > 0 && (
                        <Button ghost auto color="warning"
                            onPress={() => handleDeleteAccount(account.id)}
                        >
                            Удалить счет
                        </Button>
                    )}
                </Container>
            ))}
            <Spacer y={1.5} />
            <Button auto color="success" onPress={handleAddAccountClick}>
                Добавить счет
            </Button>
            <Spacer y={1.5} />
        </Collapse>
    );
};

export default BankAccountsForm;