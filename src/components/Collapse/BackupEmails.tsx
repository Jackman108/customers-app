import React, { useState, useEffect, useCallback, FC } from 'react';
import { Button, Collapse, Container, Spacer, Input, Col, Row } from '@nextui-org/react';


export interface BackupEmailProps {
    emails: BackupEmail[];
    onEmailsChange?: (updatedEmails: BackupEmail[]) => void;
}

const BackupEmails: FC<BackupEmailProps> = ({
    emails,
    onEmailsChange = () => { },
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    useEffect(() => {
        if (emails.length === 0) {
            const newEmail: BackupEmail = {
                id: '1',
                email: '',
            };
            onEmailsChange([newEmail]);
        }
        setIsCollapsed(true);
    }, [emails, onEmailsChange]);

    const handleAddEmail = useCallback(() => {
        const newEmail: BackupEmail = {
            id: String(emails.length + 1),
            email: '',
        };
        const updatedEmails = [...emails, newEmail];
        onEmailsChange(updatedEmails);
        setIsCollapsed(false);
    }, [emails, onEmailsChange]);

    const handleDeleteEmail = useCallback((id: string) => {
        const updatedEmails: BackupEmail[] = emails.filter((email) => email.id !== id);
        onEmailsChange(updatedEmails);
        setIsCollapsed(false);
    }, [emails, onEmailsChange]);

    const handleEmailChange = useCallback(
        (id: string, email: string) => {
            const updatedEmails = emails.map((emailItem) => {
                if (emailItem.id === id) {
                    return { ...emailItem, email };
                }
                return emailItem;
            });
            onEmailsChange(updatedEmails);
        },
        [emails, onEmailsChange]
    );

    return (
        <Collapse expanded={isCollapsed} title="Emails для счетов:">
            {emails.map((email, index) => (
                <Container key={email.id} >
                    <Spacer y={1.5} />
                    <Row align='flex-end'>
                        <Col >
                            <Input
                                id={email.id}
                                label="Email:"
                                type="email"
                                value={email.email}
                                onChange={(event) => handleEmailChange(email.id, event.target.value)}
                                required={true}
                                bordered
                                clearable
                                width="400px"
                                size="lg"
                                status={email.email === "" ? "error" : undefined}
                                helperText={email.email === "" ? "Введите ваш Email" : undefined}
                                helperColor="error"
                            />
                        </Col>
                        <Spacer  x={4} />
                        <Col>
                            {emails.length > 1 && index > 0 && (
                                <Button ghost auto color="error"
                                    onPress={() => handleDeleteEmail(email.id)}                    >
                                    Удалить счет
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            ))}
            <Spacer y={2} />
            <Button auto onPress={handleAddEmail}>
                Добавить Email
            </Button>
            <Spacer y={1.5} />
        </Collapse>
    );
};

export default BackupEmails;