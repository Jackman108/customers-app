import React, { useState, useEffect, useCallback, useRef, FC } from 'react';
import { Button, Collapse, Container, Spacer, Input, Col, Row } from '@nextui-org/react';



export interface BackupEmailProps {
    emails: BackupEmail[];
    onEmailsChange?: (updatedEmails: BackupEmail[]) => void;
}

const BackupEmails: FC<BackupEmailProps> = ({
    emails,
    onEmailsChange = () => { },
}) => {
    const handleAddEmail = useCallback(() => {
        const newEmail: BackupEmail = {
            id: String(emails.length + 1),
            email: '',
        };
        const updatedEmails = [...emails, newEmail];
        onEmailsChange(updatedEmails);
    }, [emails, onEmailsChange]);

    const handleDeleteEmail = useCallback((id: string) => {
        const deletedEmail = emails.find((email) => email.id === id);
        const updatedEmails: BackupEmail[] = emails.filter((email) => email.id !== id);
        onEmailsChange(updatedEmails);
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
    useEffect(() => {
        if (emails.length === 0) {
            const newEmail: BackupEmail = {
                id: '1',
                email: '',
            };
            onEmailsChange([newEmail]);
        }
    }, [emails, onEmailsChange]);
    return (
        <Collapse expanded title="Emails для счетов:">
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
                                <Button ghost auto color="warning"
                                    onPress={() => handleDeleteEmail(email.id)}                    >
                                    Удалить счет
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            ))}
            <Spacer y={1.5} />
            <Button auto color="success" onPress={handleAddEmail}>
                Добавить счет
            </Button>
            <Spacer y={1.5} />
        </Collapse>
    );
};

export default BackupEmails;