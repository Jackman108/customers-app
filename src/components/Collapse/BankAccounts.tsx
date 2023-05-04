import { Collapse, Input, Spacer, Switch, Button } from "@nextui-org/react";
import React from "react";

export interface BankAccountsProps {  
    id: string
    name: string;
    account: string;
    bik: string;
    corrAccount: string;
    isDefault: boolean;
    onNameChange: (name: string) => void;
    onAccountChange: (account: string) => void;
    onBikChange: (bik: string) => void;
    onCorrAccountChange: (corrAccount: string) => void;
    onIsDefaultChange: (isDefault: boolean) => void;
    onDelete: () => void;
}

function BankAccounts({
    id,
    name,
    account,
    bik,
    corrAccount,
    isDefault,
    onNameChange,
    onAccountChange,
    onBikChange,
    onCorrAccountChange,
    onIsDefaultChange,
    onDelete
}: BankAccountsProps) {
    const showDeleteButton = !isDefault;
    
    return (
        <Collapse
            expanded
            title="Банковские счета:"
        >
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
                value={account}
                onChange={(event) => onAccountChange(event.target.value)}
                required={true}
                bordered
                clearable
                width="400px"
                size="lg"
                status={account === "" ? "error" : undefined}
                helperText={account === "" ? "Введите Номер Счета:" : undefined}
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
            <Switch 
            initialChecked={true} 
            id={id}
            onChange={(event) =>  onIsDefaultChange}
            />    
                <Spacer y={1.5} />
                {showDeleteButton && (
                <Button
                    size="sm"
                    onClick={() => onDelete}
                    ghost
                    color="error"
                >
                    Удалить счет
                </Button>
            )}
            <Spacer y={1.5} />
        </Collapse>
    );
}

export default BankAccounts;