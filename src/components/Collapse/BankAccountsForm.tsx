import { useCallback, useState, memo } from "react";
import BankAccounts, { BankAccountsProps } from "./BankAccounts";
import { Spacer, Button } from "@nextui-org/react";
import generateRandomString from "../helpers/randomString";

export interface BankAccount {
    id: string;
    name: string;
    account: string;
    bik: string;
    corrAccount: string;
    isDefault: boolean;
}

export interface BankAccountsFormProps {
    bankAccounts: BankAccount[];
}


function BankAccountsForm({ bankAccounts }: BankAccountsFormProps): JSX.Element {
    const [accounts, setAccounts] = useState<BankAccount[]>(bankAccounts);

    const handleAddAccount = useCallback(() => {
        setAccounts((prevAccounts) => [
            ...prevAccounts,
            {
                id: generateRandomString(10),
                name: "",
                account: "",
                bik: "",
                corrAccount: "",
                isDefault: prevAccounts.length === 0,
            },
        ]);
    }, []);

    const handleAccountChange = useCallback(
        (id: string, key: keyof BankAccount, value: string | boolean) => {
            setAccounts((prevAccounts) =>
                prevAccounts.map((account) => {
                    if (account.id === id) {
                        return {
                            ...account,
                            [key]: value,
                        };
                    }
                    return account;
                })
            );
        },
        []
    );

    const handleDeleteAccount = useCallback(
        (id: string) => {
            setAccounts((prevAccounts) =>
                prevAccounts.filter((account) => account.id !== id)
            );
        },
        []
    );


    return (
        <>
            {accounts.map((account) => (
                <BankAccounts
                    key={account.id}
                    id={account.id}
                    name={account.name}
                    account={account.account}
                    bik={account.bik}
                    corrAccount={account.corrAccount}
                    isDefault={account.isDefault}
                    onNameChange={(value) =>
                        handleAccountChange(account.id, "name", value)
                    }
                    onAccountChange={(value) =>
                        handleAccountChange(account.id, "account", value)
                    }
                    onBikChange={(value) =>
                        handleAccountChange(account.id, "bik", value)
                    }
                    onCorrAccountChange={(value) =>
                        handleAccountChange(account.id, "corrAccount", value)
                    }
                    onIsDefaultChange={(value) => {
                        handleAccountChange(account.id, "isDefault", value);
                        if (value) {
                            setAccounts((prevAccounts) =>
                                prevAccounts.map((acc) => ({
                                    ...acc,
                                    isDefault: acc.id === account.id,
                                }))
                            );
                        }
                    }}
                    onDelete={() => handleDeleteAccount(account.id)}
                />
            ))}
            <Spacer y={1.5} />
            <Button auto ghost onClick={handleAddAccount}>
                + Добавить ещё счёт
            </Button>
        </>

    );
}

export default BankAccountsForm;