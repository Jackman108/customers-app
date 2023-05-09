import { Collapse, Input, Spacer, Container } from "@nextui-org/react";
import { FC } from "react";

export interface OrganizationProps {
    orgDetails: OrgDetails;
    onOrgDetailsChange: (updatedOrgDetails: OrgDetails) => void;
}
const OrganizationDetails: FC<OrganizationProps> = ({
    orgDetails,
    onOrgDetailsChange,
}) => {
    const { id, name, inn, kpp, ogrn, addr, } = orgDetails;

    return (
        <Collapse expanded title="Детали Организации:">
            <Container>
                <Spacer y={1.5} />
                <Input
                    id={id}
                    label="Название Организации:"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        onOrgDetailsChange({ ...orgDetails, name: event.target.value })
                    }
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
                    onChange={(event) =>
                        onOrgDetailsChange({ ...orgDetails, inn: event.target.value })
                    }
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
                    onChange={(event) =>
                        onOrgDetailsChange({ ...orgDetails, kpp: event.target.value })
                    }
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
                    onChange={(event) =>
                        onOrgDetailsChange({ ...orgDetails, ogrn: event.target.value })
                    }
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
                    onChange={(event) =>
                        onOrgDetailsChange({ ...orgDetails, addr: event.target.value })
                    }
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