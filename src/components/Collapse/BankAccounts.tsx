import { Container, Collapse, Input, Spacer, Switch, Button } from "@nextui-org/react";
import React, { useState } from "react";
import generateRandomString from "../helpers/randomString";
export interface BankAccount {
    id: string
    name: string;
    accountNum: string;
    bik: string;
    corrAccount: string;
    isDefault: boolean;
}
export interface BankAccountsProps {
    id: string
    name: string;
    accountNum: string;
    bik: string;
    corrAccount: string;
    isDefault: boolean;
    onNameChange: (name: string) => void;
    onAccountNumChange: (account: string) => void;
    onBikChange: (bik: string) => void;
    onCorrAccountChange: (corrAccount: string) => void;
    onIsDefaultChange: (isDefault: boolean) => void;
    onDelete: () => void;
}
function BankAccounts({
    id,
    name,
    accountNum,
    bik,
    corrAccount,
    isDefault,
    onNameChange,
    onAccountNumChange,
    onBikChange,
    onCorrAccountChange,
    onIsDefaultChange,
    onDelete,
}: BankAccountsProps): JSX.Element {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
        {
            id,
            name,
            accountNum,
            bik,
            corrAccount,
            isDefault,
        },
    ]);
    const addBankAccount = () => {
        const newId = generateRandomString(10);
        setBankAccounts([
            ...bankAccounts,
            {
                id: newId,
                name: "",
                accountNum: "",
                bik: "",
                corrAccount: "",
                isDefault: true,
            },
        ]);
    };

    return (
        <Collapse
            expanded
            title="Банковские счета:"
        >
            <div>
                {bankAccounts.map((bankAccount, index) => (
                    <Container key={bankAccount.id}>
                        {index > 0 && (
                            <Switch

                                disabled={bankAccount.isDefault}
                                onChange={() => {
                                    const newAccounts = [...bankAccounts];
                                    const currentDefault = newAccounts.find(
                                        (account) => account.isDefault
                                    );
                                    if (currentDefault) {
                                        currentDefault.isDefault = false;
                                    }
                                    newAccounts[index].isDefault = true;
                                    setBankAccounts(newAccounts);
                                }}
                            >
                                Дефолтный счет
                            </Switch>
                        )}
                        <Spacer y={1.5} />
                        <Input
                            id={id}
                            label="Название Счета:"
                            type="text"
                            value={name}
                            onChange={(event) => onNameChange(event.target.value)}
                            required={true}
                            bordered
                            clearable
                            width="400px"
                            size="lg"
                            status={name === "" ? "error" : undefined}
                            helperText={name === "" ? "Введите Название Счета" : undefined}
                            helperColor="error"
                        />
                        <Spacer y={1.5} />
                        <Input
                            id={id}
                            label="Номер Счета:"
                            type="text"
                            value={accountNum}
                            onChange={(event) => onAccountNumChange(event.target.value)}
                            required={true}
                            bordered
                            clearable
                            width="400px"
                            size="lg"
                            status={accountNum === "" ? "error" : undefined}
                            helperText={accountNum === "" ? "Введите Номер Счета:" : undefined}
                            helperColor="error"
                        />
                        <Spacer y={1.5} />
                        <Input
                            id={id}
                            label="БИК Счета:"
                            type="text"
                            value={bik}
                            onChange={(event) => onBikChange(event.target.value)}
                            required={true}
                            bordered
                            clearable
                            width="400px"
                            size="lg"
                            status={bik === "" ? "error" : undefined}
                            helperText={bik === "" ? "Введите БИК Счета" : undefined}
                            helperColor="error"
                        />
                        <Spacer y={1.5} />
                        <Input
                            id={id}
                            label="Корр. Номер Счета:"
                            type="text"
                            value={corrAccount}
                            onChange={(event) => onCorrAccountChange(event.target.value)}
                            required={true}
                            bordered
                            clearable
                            width="400px"
                            size="lg"
                            status={corrAccount === "" ? "error" : undefined}
                            helperText={corrAccount === "" ? "Введите Корр. Номер Счета" : undefined}
                            helperColor="error"
                        />
                        <Spacer y={1.5} />
                        {index === bankAccounts.length - 1 && (
                            <Button onClick={addBankAccount}>
                                Добавить еще счет
                            </Button>
                        )}
                        {index > 0 && (
                            <Button
                                color="error" auto ghost
                                onClick={() => {
                                    const newAccounts = [...bankAccounts];
                                    newAccounts.splice(index, 1);
                                    setBankAccounts(newAccounts);
                                }}
                            >
                                Удалить счет
                            </Button>
                        )}
                        <Spacer y={1.5} />


                        <Spacer y={1.5} />
                    </Container>
                ))}
            </div>
        </Collapse>
    );
}
export default BankAccounts;