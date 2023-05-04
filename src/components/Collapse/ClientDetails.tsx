import { Collapse, Input, Spacer } from "@nextui-org/react";
import React from "react";

interface ClientDetailsProps {
    id: string;
    name: string;
    email: string;
    deferralDays: number;
    creditLimit: number;
    onNameChange: (name: string) => void;
    onEmailChange: (email: string) => void;
    onDeferralDaysChange: (days: number) => void;
    onCreditLimitChange: (limit: number) => void;
}

function ClientDetails({
    id,
    name,
    email,
    deferralDays,
    creditLimit,
    onNameChange,
    onEmailChange,
    onDeferralDaysChange,
    onCreditLimitChange,
}: ClientDetailsProps) {
    return (
        <Collapse
            expanded
            title="Детали Клиента:"
        >
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Имя:"
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                required={true}
                bordered
                clearable
                width="400px"
                size="lg"
                status={name === "" ? "error" : undefined}
                helperText={name === "" ? "Введите ваше имя" : undefined}
                helperColor="error"
            />
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Email:"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                required={true}
                bordered
                clearable
                width="400px"
                size="lg"
                status={email === "" ? "error" : undefined}
                helperText={email === "" ? "Введите ваш Email" : undefined}
                helperColor="error"
            />
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Отсрочка (дни):"
                type="number"
                min="0"
                step="1"
                value={deferralDays}
                onChange={(event) =>
                    onDeferralDaysChange
                        (Math.max(Number(event.target.value), 0))
                }
                required={true}
                bordered
                clearable
                width="400px"
                size="lg"
                status={deferralDays === 0 ? "error" : undefined}
                helperText={deferralDays === 0 ? "Введите отсрочку, дней" : undefined}
                helperColor="error"
            />
            <Spacer y={1.5} />
            <Input
                id={id}
                label="Кредитный лимит:"
                type="number"
                min="0"
                step="1"
                value={creditLimit}
                onChange={(event) => onCreditLimitChange
                    (Math.max(Number(event.target.value), 0))
                }
                required={true}
                bordered
                clearable
                width="400px"
                size="lg"
                status={creditLimit === 0 ? "error" : undefined}
                helperText={creditLimit === 0 ? "Введите кредитный лимит" : undefined}
                helperColor="error"
            />
            <Spacer y={1.5} />
        </Collapse>
    );
}

export default ClientDetails;