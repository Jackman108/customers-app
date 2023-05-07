import { Collapse, Input, Spacer, Container } from "@nextui-org/react";
import React from "react";

interface OrganizationDetailsProps {
    id: string
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    addr: string;
    onNameChange: (name: string) => void;
    onInnChange: (inn: string) => void;
    onKppChange: (kpp: string) => void;
    onOgrnChange: (ogrn: string) => void;
    onAddressChange: (addr: string) => void;
}

function OrganizationDetails({
    id,
    name,
    inn,
    kpp,
    ogrn,
    addr,
    onNameChange,
    onInnChange,
    onKppChange,
    onOgrnChange,
    onAddressChange,
}: OrganizationDetailsProps) {
    return (
        <Collapse expanded title="Детали Организации:">
            <Container>
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="Название Организации:"
                    type="text"
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    required={true}
                    bordered
                    clearable
                    width="400px"
                    size="lg"
                    status={name === "" ? "error" : undefined}
                    helperText={name === "" ? "Введите Название Организации" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="ИНН Организации:"
                    type="text"
                    value={inn}
                    onChange={(event) => onInnChange(event.target.value)}
                    required={true}
                    bordered
                    clearable
                    width="400px"
                    size="lg"
                    status={inn === "" ? "error" : undefined}
                    helperText={inn === "" ? "Введите ИНН Организации:" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="КПП Организации:"
                    type="text"
                    value={kpp}
                    onChange={(event) => onKppChange(event.target.value)}
                    required={true}
                    bordered
                    clearable
                    width="400px"
                    size="lg"
                    status={kpp === "" ? "error" : undefined}
                    helperText={kpp === "" ? "Введите отсрочку, дней" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="ОГРН Организации:"
                    type="text"
                    value={ogrn}
                    onChange={(event) => onOgrnChange(event.target.value)}
                    required={true}
                    bordered
                    clearable
                    width="400px"
                    size="lg"
                    status={ogrn === "" ? "error" : undefined}
                    helperText={ogrn === "" ? "Введите ОГРН Организации" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="Адрес Организации:"
                    type="text"
                    value={addr}
                    onChange={(event) => onAddressChange(event.target.value)}
                    required={true}
                    bordered
                    clearable
                    width="400px"
                    size="lg"
                    status={addr === "" ? "error" : undefined}
                    helperText={addr === "" ? "Введите Адрес Организации" : undefined}
                    helperColor="error"
                />
                <Spacer y={1.5} />
            </Container>
        </Collapse>
    );
}

export default OrganizationDetails;