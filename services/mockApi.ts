import { ProductType, NetworkProvider, Package, Transaction, UserAccount, DailyRevenue } from '../types';
import { packages } from '../data/packages';

const mockUser: UserAccount = {
    name: 'John Doe',
    phoneNumber: '0712345678',
};

const mockTransactions: Transaction[] = [
    { id: 't1', type: ProductType.Data, description: '5GB (Monthly)', amount: 500, date: '2024-07-20', status: 'Completed' },
    { id: 't2', type: ProductType.Minutes, description: '100 Mins', amount: 100, date: '2024-07-18', status: 'Completed' },
    { id: 't3', type: ProductType.SMS, description: '200 SMS', amount: 20, date: '2024-07-15', status: 'Failed' },
    { id: 't4', type: ProductType.Data, description: '1GB (Weekly)', amount: 100, date: '2024-07-12', status: 'Completed' },
    { id: 't5', type: ProductType.Data, description: '200MB (Daily)', amount: 50, date: '2024-07-21', status: 'Pending' },
];

// FIX: Added mock data for daily revenue to be used in AdminPage.tsx
const mockDailyRevenue: DailyRevenue[] = [
    { date: '2024-07-15', revenue: 18540 },
    { date: '2024-07-16', revenue: 21320 },
    { date: '2024-07-17', revenue: 19870 },
    { date: '2024-07-18', revenue: 23450 },
    { date: '2024-07-19', revenue: 25100 },
    { date: '2024-07-20', revenue: 22680 },
    { date: '2024-07-21', revenue: 24500 },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getPackages = async (productType: ProductType, provider: NetworkProvider): Promise<Package[]> => {
    await delay(500);
    return packages[productType]?.[provider] ?? [];
};

export const getUserAccount = async (): Promise<UserAccount> => {
    await delay(300);
    return mockUser;
};

export const getTransactions = async (): Promise<Transaction[]> => {
    await delay(700);
    return mockTransactions;
};

// FIX: Added getDailyRevenue function to fix import error in AdminPage.tsx
export const getDailyRevenue = async (): Promise<DailyRevenue[]> => {
    await delay(600);
    return mockDailyRevenue;
};

export const buyPackage = async (packageId: string, receivingNumber: string, payingNumber: string): Promise<{ success: boolean; message: string; transactionId?: string }> => {
    await delay(1500);
    console.log(`Buying package ${packageId} for ${receivingNumber}, paid by ${payingNumber}`);
    if (receivingNumber.length < 10 || payingNumber.length < 10) {
        return { success: false, message: 'Invalid phone number provided.' };
    }

    let pkgDetails: Package | undefined;
    let productType: ProductType | undefined;

    // Find the package and its type
    for (const pType of Object.keys(packages) as ProductType[]) {
        for (const provider of Object.keys(packages[pType]) as NetworkProvider[]) {
            const found = packages[pType][provider]?.find(p => p.id === packageId);
            if (found) {
                pkgDetails = found;
                productType = pType;
                break;
            }
        }
        if (pkgDetails) break;
    }

    if (!pkgDetails || !productType) {
        return { success: false, message: 'Package not found.' };
    }

    const newTransaction: Transaction = {
        id: `txn_${Date.now()}`, // unique ID
        type: productType,
        description: pkgDetails.description,
        amount: pkgDetails.price,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
    };
    
    mockTransactions.unshift(newTransaction); // Add to the top of the list

    return { success: true, message: 'Purchase is processing. You will receive a notification shortly.', transactionId: newTransaction.id };
};


export const completeTransaction = async (transactionId: string): Promise<Transaction | null> => {
    await delay(100); // short delay to simulate DB update
    const transaction = mockTransactions.find(tx => tx.id === transactionId);
    if (transaction) {
        transaction.status = 'Completed';
    }
    return transaction || null;
}

export const trackOrderById = async (orderId: string): Promise<Transaction | null> => {
    await delay(1000);
    const transaction = mockTransactions.find(tx => tx.id.toLowerCase() === orderId.toLowerCase());
    return transaction || null;
}
