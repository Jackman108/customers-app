import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Collapse, Container, Spacer } from '@nextui-org/react';
import generateRandomString from '../helpers/randomString';
import BankAccountItem, { BankAccountItemProps, BankAccountItems } from './BankAccountItem';

export interface BankAccountsFormProps {
    accounts: BankAccountItemProps['account'][];
    onAccountsChange: (updatedAccounts: BankAccountItemProps['account'][]) => void;
}

const BankAccountsForm: React.FC<BankAccountsFormProps> = ({
    accounts,
    onAccountsChange
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [defaultAccountBlocked, setDefaultAccountBlocked] = useState(() => {
        return accounts.length > 1 ? accounts.some((account) => account.is_default) : false;
    });
    const [activeAccountId, setActiveAccountId] = useState(
        accounts.length > 0 ? accounts[0].id : '');
        
    useEffect(() => {
        if (accounts.length === 0) {
            const newAccount: BankAccountItems = {
                id: generateRandomString(8),
                name: '',
                account_number: '',
                bik: '',
                corr_account_number: '',
                is_default: accounts.length === 0,
            };
            setDefaultAccountBlocked(true);
            onAccountsChange([newAccount]);
        } else if (accounts.length > 0 && accounts[0].is_default) {
            const newAccounts = [...accounts];
            const addedAccount = newAccounts.find((account) => !account.is_default);
            if (addedAccount) {
                addedAccount.is_default = false;
                setDefaultAccountBlocked(accounts[0].is_default);
                onAccountsChange(newAccounts);
            } 
            setIsCollapsed(true);           
        }
    }, [accounts.length, accounts[0]?.is_default || false, onAccountsChange]);

    const handleAddAccountClick = useCallback(() => {
        const newAccount: BankAccountItems = {
            id: generateRandomString(8),
            name: '',
            account_number: '',
            bik: '',
            corr_account_number: '',
            is_default: false,
        };
        const newAccounts = [...accounts, newAccount];
        setDefaultAccountBlocked(false);
        onAccountsChange(newAccounts);
        setIsCollapsed(false);      
    }, [accounts, onAccountsChange]);


    const handleAccountChange = useCallback(
        (updatedAccount: BankAccountItemProps['account']) => {
            const accountIndex = accounts.findIndex((account) => account.id === updatedAccount.id);
            const newAccounts = [...accounts];
            newAccounts[accountIndex] = updatedAccount;
            onAccountsChange(newAccounts);
        },
        [accounts, onAccountsChange],
    );

    const handleSwitchChange = useCallback((id: string, isDefault: boolean) => {
        const newAccounts: BankAccountItems[] = [...accounts];
        newAccounts.forEach((account) => {
            account.is_default = account.id === id ? isDefault : false;
        });
        setDefaultAccountBlocked(isDefault);
        onAccountsChange(newAccounts);
    }, [accounts, onAccountsChange]);

    const handleDeleteAccount = useCallback((id: string) => {
        const deletedAccount = accounts.find((account) => account.id === id);
        const newAccounts: BankAccountItems[] = accounts.filter((account) => account.id !== id);
        if (deletedAccount && deletedAccount.is_default) {
            newAccounts[0].is_default = true;
        }
        setActiveAccountId(newAccounts.length > 0 ? newAccounts[0].id : '');
        onAccountsChange(newAccounts);
        setIsCollapsed(false);  
    }, [accounts, onAccountsChange]);

    return (
        <Collapse expanded={isCollapsed} title="Банковские счета:" >                    
                {accounts.map((account, index) => (
                    <Container key={account.id} title={account.name} >
                        <BankAccountItem
                            account={account}
                            onAccountChange={handleAccountChange}
                            onSwitchChange={handleSwitchChange}
                        />
                        {accounts.length > 1 && index > 0 && (
                            <Button ghost auto color="warning"
                                onPress={() => handleDeleteAccount(account.id)}>
                                Удалить счет                                
                            </Button>                            
                        )}
                        <Spacer y={2} />
                    </Container>
                ))}
            <Spacer y={1.5} />
            <Button auto onPress={handleAddAccountClick}>
                Добавить счет
            </Button>
            <Spacer y={1.5} />
        </Collapse>
    );
};

export default BankAccountsForm;