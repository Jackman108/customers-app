interface Customer {
    id?: string;
    name: string;
    email: string;
    deferral_days: number;
    credit_limit: number;
    org: OrgDetails;
    metadata: MetaData[];
    created_at: string;
    updated_at: string;
    backupEmails: BackupEmail[];
}
interface OrgDetails {
    id?: string;
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    addr: string;
    bank_accounts?: BankAccount[];
    created_at: string;
    updated_at: string;
}
interface MetaData {
    key: string;
    value: string;
}
interface BankAccount {
    id: string;
    name: string;
    bik: string;
    account_number: string;
    corr_account_number: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}
interface BackupEmail {
    id: string;
    email: string;
    }