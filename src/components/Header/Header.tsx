import { GrSearch } from 'react-icons/gr';
import styles from './Header.module.css'
import { Modal, useModal, Button, Input } from "@nextui-org/react";
import ClientModal from '@/components/ClientModal/ClientModal';

interface HeaderProps {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    handleResetSearch: () => void;
    handleAddClient: (client: Customer) => void;
};

const Header: React.FC<HeaderProps> = ({
    searchText,
    setSearchText,
    handleSearch,
    handleResetSearch,
    handleAddClient,
}) => {
    const { bindings, setVisible } = useModal();
    const handleClose = () => {
        bindings.onClose();
    };

    return (
        <header className={styles.menu}>
            <h1 className={styles.title}>Клиенты</h1>
            <form onSubmit={handleSearch}
                className={styles.content}>
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <Button
                    ghost auto
                    className={styles.button}
                    type="submit">
                    <GrSearch />
                </Button>
                <Button
                    ghost auto color="error"
                    className={styles.button}
                    type="button"
                    onClick={handleResetSearch}>
                    &times;
                </Button>
                <Button
                    auto shadow color="secondary" onPress={() => setVisible(true)}>
                    + Добавить клиента
                </Button>
            </form>
            <ClientModal
                handleAddClient={handleAddClient}
                bindings={bindings}
                onClose={handleClose}
            />
        </header>
    );
};

export default Header;
