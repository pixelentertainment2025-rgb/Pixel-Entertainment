import React from 'react';

const Marquee: React.FC = () => {
    const text = "AdSokoni: Your one-stop shop for data, airtime, and SMS. Refer a friend and earn rewards! We support Safaricom, Airtel, and Telkom.";

    return (
        <div className="bg-gray-100 border-t border-b border-gray-200 w-full overflow-hidden">
            <div className="flex animate-marquee">
                <p className="flex-shrink-0 whitespace-nowrap py-2 px-8 text-sm text-gray-700">{text}</p>
                <p className="flex-shrink-0 whitespace-nowrap py-2 px-8 text-sm text-gray-700" aria-hidden="true">{text}</p>
            </div>
        </div>
    );
};

export default Marquee;
