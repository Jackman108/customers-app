import { Collapse, Input, Spacer, Container } from "@nextui-org/react";
import React, { FC } from "react";

export interface ClientDetailsProps {
    details: Customer;
    onDetailsChange: (updatedDetails: Customer) => void;
}
const ClientDetails: FC<ClientDetailsProps> = ({
    details,
    onDetailsChange,
}) => {
    const { id, name, email, deferral_days: deferralDays, credit_limit: creditLimit } = details;

    return (
        <Collapse expanded title="Детали Клиента:">
            <Container >
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="Имя:"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        onDetailsChange({ ...details, name: event.target.value })
                    }
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
                    onChange={(event) =>
                        onDetailsChange({ ...details, email: event.target.value })
                    }
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
                        onDetailsChange({ ...details, deferral_days: Math.max(Number(event.target.value), 0) })
                    }
                    required={true}
                    bordered
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
                    onChange={(event) =>
                        onDetailsChange({ ...details, credit_limit: Math.max(Number(event.target.value), 0) })
                    }
                    required={true}
                    bordered
                    width="400px"
                    size="lg"
                    status={creditLimit === 0 ? "error" : undefined}
                    helperText={creditLimit === 0 ? "Введите кредитный лимит" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
            </Container>
        </Collapse>
    );
}

export default ClientDetails;