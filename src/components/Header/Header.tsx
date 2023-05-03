import { GrSearch } from 'react-icons/gr';
import styles from './Header.module.css'
import { Modal, useModal, Button, Text, Collapse, Input } from "@nextui-org/react";
import ClientModal from '@/components/ClientModal/ClientModal';

interface HeaderProps {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    handleResetSearch: () => void;
    onCreate: (client: Customer) => void;
};

const Header: React.FC<HeaderProps> = ({
    searchText,
    setSearchText,
    handleSearch,
    handleResetSearch,
    onCreate,
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
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <button
                    className={styles.button}
                    type="submit">
                    <GrSearch />
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={handleResetSearch}>
                    &times;
                </button>
            </form>
            <Button
                auto shadow color="secondary" onPress={() => setVisible(true)}>
                +Add client
            </Button>
            <ClientModal
                onCreate={onCreate}
                bindings={bindings}
                onClose={handleClose}
            />

        </header>
    );
};

export default Header;
