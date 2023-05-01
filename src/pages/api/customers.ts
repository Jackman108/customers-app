
interface Customer {
    id: number;
    name: string;
    email: string;
    deferral_days: number;
    created_at: Date;
    updated_at: Date;
    [key: string]: any;
}

