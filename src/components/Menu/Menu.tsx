import { Input, Button } from '@nextui-org/react';
import { GrSearch } from 'react-icons/gr';
import styles from './Menu.module.css'


type MenuProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    handleResetSearch: () => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({
    searchText,
    setSearchText,
    handleSearch,
    handleResetSearch,
    setShowModal,
}) => {
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
            <button
                className={styles.addButton}
                onClick={() => setShowModal(true)}>
                + Добавить клиента
            </button>
        </header>
    );
};

export default Menu;
