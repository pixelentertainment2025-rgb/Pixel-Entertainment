import { ProductType, NetworkProvider, Package } from '../types';

export const packages: Record<ProductType, Partial<Record<NetworkProvider, Package[]>>> = {
    [ProductType.Data]: {
        [NetworkProvider.Safaricom]: [
            { id: 'saf-d-1', description: '70MB (Daily)', price: 20 },
            { id: 'saf-d-2', description: '200MB (Daily)', price: 50 },
            { id: 'saf-d-3', description: '1GB (Weekly)', price: 100 },
            { id: 'saf-d-4', description: '2.5GB (Weekly)', price: 250 },
            { id: 'saf-d-5', description: '5GB (Monthly)', price: 500 },
            { id: 'saf-d-6', description: '10GB (Monthly)', price: 1000 },
            { id: 'saf-d-7', description: '25GB Giga Bundle (Monthly)', price: 1500 },
        ],
        [NetworkProvider.Airtel]: [
            { id: 'air-d-1', description: '100MB (Daily)', price: 20 },
            { id: 'air-d-2', description: '1GB (Daily)', price: 99 },
            { id: 'air-d-3', description: '3GB (Weekly)', price: 250 },
            { id: 'air-d-4', description: '6GB (Weekly)', price: 500 },
            { id: 'air-d-5', description: '5GB (Monthly)', price: 500 },
            { id: 'air-d-6', description: '12GB (Monthly)', price: 1000 },
        ],
        [NetworkProvider.Telkom]: [
            { id: 'tel-d-1', description: '150MB (Daily)', price: 20 },
            { id: 'tel-d-2', description: '2GB (Daily)', price: 100 },
            { id: 'tel-d-3', description: '7GB (Weekly)', price: 250 },
            { id: 'tel-d-4', description: '15GB (Weekly)', price: 500 },
            { id: 'tel-d-5', description: '20GB (Monthly)', price: 1000 },
            { id: 'tel-d-6', description: '45GB (Monthly)', price: 2000 },
        ]
    },
    [ProductType.Minutes]: {
        [NetworkProvider.Safaricom]: [
            { id: 'saf-m-1', description: '50 Mins', price: 50 },
            { id: 'saf-m-2', description: '100 Mins', price: 100 },
            { id: 'saf-m-3', description: '250 Mins', price: 250 },
        ],
        [NetworkProvider.Airtel]: [
            { id: 'air-m-1', description: '60 Mins', price: 50 },
            { id: 'air-m-2', description: '150 Mins', price: 100 },
            { id: 'air-m-3', description: '400 Mins', price: 250 },
        ],
        [NetworkProvider.Telkom]: [
            { id: 'tel-m-1', description: '50 Mins', price: 49 },
            { id: 'tel-m-2', description: '100 Mins', price: 99 },
            { id: 'tel-m-3', description: '200 Mins', price: 199 },
        ]
    },
    [ProductType.SMS]: {
        [NetworkProvider.Safaricom]: [
            { id: 'saf-s-1', description: '200 SMS', price: 20 },
            { id: 'saf-s-2', description: '1000 SMS', price: 50 },
            { id: 'saf-s-3', description: '2500 SMS', price: 100 },
        ],
        [NetworkProvider.Airtel]: [
            { id: 'air-s-1', description: '200 SMS', price: 15 },
            { id: 'air-s-2', description: '1000 SMS', price: 40 },
        ],
        [NetworkProvider.Telkom]: [
            { id: 'tel-s-1', description: '250 SMS', price: 20 },
            { id: 'tel-s-2', description: '1250 SMS', price: 50 },
        ]
    }
};