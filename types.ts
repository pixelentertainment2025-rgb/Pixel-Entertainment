export enum ProductType {
    Data = 'Data',
    Minutes = 'Minutes',
    SMS = 'SMS'
}

export enum NetworkProvider {
    Safaricom = 'Safaricom',
    Airtel = 'Airtel',
    Telkom = 'Telkom'
}

export interface Package {
    id: string;
    description: string; // e.g., "5GB (Monthly)"
    price: number; // in KSh
}

export interface Transaction {
    id: string;
    type: ProductType;
    description: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

export interface UserAccount {
    name: string;
    phoneNumber: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  provider: NetworkProvider;
  bgColor: string; // Fallback color
  textColor: string;
  backgroundImage?: string; // Optional image URL
}

// FIX: Add DailyRevenue interface to fix type error in AdminPage.tsx
export interface DailyRevenue {
    date: string;
    revenue: number;
}