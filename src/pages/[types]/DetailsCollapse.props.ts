interface DetailsCollapseProps {
    onCreate: (client: Customer) => void;
    name: string;
    email: string;
    deferral_days: number;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setDeferralDays: (days: number) => void;
}