import React, { useEffect, useCallback, useRef, FC, useMemo, useState } from 'react';
import { Button, Collapse, Container, Spacer, Input, Col, Row, Text, Card } from '@nextui-org/react';

export interface MetaDataProps {
    metaData: MetaData[];
    onMetaChange?: (updatedMetaData: MetaData[]) => void;
}

const MetaData: FC<MetaDataProps> = ({
    metaData,
    onMetaChange: onMetaChange = () => { },
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    useEffect(() => {
        if (metaData.length === 0) {
            const newMeta: MetaData = {
                key: '',
                value: '',
            };
            onMetaChange([newMeta]);
        }
        setIsCollapsed(true);
    }, [metaData.length, onMetaChange]);

    const handleAddMeta = useCallback((): void => {
        const newMeta: MetaData = {
            key: '',
            value: '',
        };
        const updatedMeta: MetaData[] = [...metaData, newMeta];
        if (onMetaChange) {
            onMetaChange(updatedMeta);
        }
        setIsCollapsed(false); 
    }, [metaData, onMetaChange]);

    const handleKeyChange = useCallback(
        (index: number, value: string) => {
            const updatedMeta = metaData.map((item, i) => {
                if (i === index) {
                    return { ...item, key: value, };
                }
                return item;
            });
            if (onMetaChange) {
                onMetaChange(updatedMeta);
            }
        },
        [metaData, onMetaChange]
    );

    const handleValueChange = useCallback(
        (index: number, value: string) => {
            const updatedMeta = metaData.map((item, i) => {
                if (i === index) {
                    return { ...item, value: value, };
                }
                return item;
            });
            onMetaChange(updatedMeta);
        },
        [metaData, onMetaChange]
    );

    const handleDeleteMeta = useCallback((index: number): void => {
        const updatedMeta: MetaData[] = metaData.filter((_, i) => i !== index);
        onMetaChange(updatedMeta);
        setIsCollapsed(false);
    }, [metaData, onMetaChange]);
    return (
        <Collapse expanded={isCollapsed} title="Meta:">
            <Container>
                <Card css={{ p: 20, $$cardColor: '$colors$gray100' }}>
                    <Row >
                        <Spacer x={3} />
                        <Col >
                            <Text h4>
                                Ключ
                            </Text>
                        </Col>
                        <Spacer x={4} />
                        <Col>
                            <Text h4>
                                Значение
                            </Text>
                        </Col>
                        <Col />
                    </Row>
                </Card>
            </Container>
            <Container display='grid'>
                {metaData.map((data, index) => (
                    index > 0 &&
                    <Row align='flex-end' key={index}>
                        <Col >
                            <Input
                                aria-label='key'
                                name={`key-${index}`}
                                type="text"
                                value={data.key}
                                onChange={(event) => handleKeyChange(index, event.target.value)}
                                required={true}
                                bordered
                                clearable
                                width="200px"
                                size="lg"
                                status={data.key === "" ? "error" : undefined}
                                helperText={data.key === "" ? "Введите ваш Ключ" : undefined}
                                helperColor="error"
                            />
                        </Col>
                        <Spacer x={4} />
                        <Col >
                            <Input
                                aria-label='value'
                                name={`value-${index}`}
                                type="text"
                                value={data.value}
                                onChange={(event) => handleValueChange(index, event.target.value)}
                                required={true}
                                bordered
                                clearable
                                width="200px"
                                size="lg"
                                status={data.value === "" ? "error" : undefined}
                                helperText={data.value === "" ? "Введите ваше Значение" : undefined}
                                helperColor="error"
                            />
                        </Col>
                        <Spacer x={4} />
                        <Col>
                            <Button ghost auto color="error"
                                onPress={() => handleDeleteMeta(index)}>
                                &times;
                            </Button>
                        </Col>
                        <Spacer y={4} />
                    </Row>
                ))}

            </Container>
            <Spacer y={3} />
            <Button auto onPress={handleAddMeta}>
                Создать
            </Button>
            <Spacer y={1.5} />
        </Collapse>


    );
};

export default MetaData;