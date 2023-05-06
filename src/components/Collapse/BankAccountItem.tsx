import { Container, Input, Spacer, Switch, Button, Text } from "@nextui-org/react";
import React, { useState, FC } from "react";

export interface BankAccountProps {
    id: string;
    name: string;
    accountNum: string;
    bik: string;
    corrAccount: string;
    isDefault: boolean;
    }
    
    export interface BankAccountItemProps {
    account: BankAccountProps;
    onAccountChange: (updatedAccount: BankAccountProps) => void;
    onSwitchChange: (id: string, isDefault: boolean) => void;
    }

const BankAccountItem: FC<BankAccountItemProps> = ({
    account,
    onAccountChange,
    onSwitchChange,
}) => {
    const { id, name, accountNum, bik, corrAccount, isDefault } = account;
    const [prevIsDefault, setPrevIsDefault] = useState(isDefault);

    const handleDefaultChange = (): void => {
        if (!isDefault) {
            const updatedAccount = {
                ...account,
                isDefault: true,
            };
            onAccountChange(updatedAccount);
            onSwitchChange(id, true);
            setPrevIsDefault(true);
        }
    };

    return (
        <Container        >
            <Text h6 size={15} css={{ m: 0 }}>
                Новый счёт: {id}
            </Text>
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Название Счета:"
                type="text"
                value={name}
                onChange={(event) =>
                    onAccountChange({ ...account, name: event.target.value })
                }
                required
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
                onChange={(event) =>
                    onAccountChange({ ...account, accountNum: event.target.value })
                }
                required
                bordered
                clearable
                width="400px"
                size="lg"
                status={accountNum === "" ? "error" : undefined}
                helperText={
                    accountNum === "" ? "Введите Номер Счета:" : undefined
                }
                helperColor="error"
            />
            <Spacer y={1.5} />
            <Input
                id={id}
                label="БИК Счета:"
                type="text"
                value={bik}
                onChange={(event) =>
                    onAccountChange({ ...account, bik: event.target.value })
                }
                required
                bordered
                clearable
                width="400px"
                size="lg"
                status={bik === "" ? "error" : undefined}
                helperText={bik === "" ? "Введите БИК Счета:" : undefined}
                helperColor="error"
            />
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Корр. Номер Счета:"
                type="text"
                value={corrAccount}
                onChange={(event) =>
                    onAccountChange({ ...account, corrAccount: event.target.value })
                }
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
                id={`is-default-${id}`}
                checked={isDefault}
                disabled={isDefault}
                onChange={handleDefaultChange}
                color={"secondary"}
            />
            <Spacer y={1.5} />
        </Container>
    );
}
export default BankAccountItem;