
interface Customer {
    id: string;
    name: string;
    email: string;
    deferral_days: number;
    org: {
        id: string;
        name: string;
        inn: string;
        kpp: string;
        ogrn: string;
        addr: string;
        bank_accounts: {
            id: string;
            name: string;
            bik: string;
            account_number: string;
            corr_account_number: string;
            is_default: boolean;
            created_at: string;
            updated_at: string;
        }[];
    };
    [key: string]: any;
}
