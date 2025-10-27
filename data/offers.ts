import { NetworkProvider, Offer } from "../types";

export const offers: Offer[] = [
    {
        id: 'offer-1',
        title: 'Safaricom Bonanza!',
        description: 'Get 10GB monthly for only KSh 1,000.',
        provider: NetworkProvider.Safaricom,
        bgColor: 'bg-green-600',
        textColor: 'text-white',
        backgroundImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
    },
    {
        id: 'offer-2',
        title: 'Airtel Amazing Data',
        description: 'Enjoy 12GB for just KSh 1,000.',
        provider: NetworkProvider.Airtel,
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop',
    },
    {
        id: 'offer-3',
        title: 'Telkom Freedom Bundles',
        description: '20GB of data for KSh 1,000. Don\'t miss out!',
        provider: NetworkProvider.Telkom,
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        backgroundImage: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop',
    },
    {
        id: 'offer-4',
        title: 'Weekend Special',
        description: 'Unlimited data all weekend for KSh 200!',
        provider: NetworkProvider.Safaricom,
        bgColor: 'bg-purple-600',
        textColor: 'text-white',
        backgroundImage: 'https://images.unsplash.com/photo-1557682224-5b8590b9ec98?q=80&w=2029&auto=format&fit=crop',
    }
];