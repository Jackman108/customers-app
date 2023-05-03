interface  CreateClientProps {
        onCreate: (client: Customer) => void;
        onClose: () => void;
        modalRoot?: Element;
    };