import React, { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { CloseIcon } from './icons/CloseIcon';
import { MailIcon } from './icons/MailIcon';
import { MessageIcon } from './icons/MessageIcon';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const shareText = `Get the AdSokoni app for the best deals on data, minutes, and SMS!`;
    const encodedText = encodeURIComponent(shareText);
    const fullEncodedText = encodeURIComponent(`${shareText} ${url}`);

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
        >
            <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <Card className="relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Close"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                    <h2 id="share-modal-title" className="text-xl font-bold text-center mb-4">Share App</h2>
                    
                    <div className="flex justify-around mb-6 text-center">
                        <a href={`https://api.whatsapp.com/send?text=${fullEncodedText}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-brand-green" aria-label="Share on WhatsApp">
                           <span className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mx-auto text-green-500 font-bold text-lg" style={{fontFamily: 'monospace'}}>WA</span>
                           <span className="text-xs mt-1 block">WhatsApp</span>
                        </a>
                        <a href={`mailto:?subject=${encodedText}&body=${fullEncodedText}`} className="text-gray-600 dark:text-gray-300 hover:text-brand-green" aria-label="Share via Email">
                           <span className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mx-auto"><MailIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" /></span>
                           <span className="text-xs mt-1 block">Email</span>
                        </a>
                        <a href={`sms:?body=${fullEncodedText}`} className="text-gray-600 dark:text-gray-300 hover:text-brand-green" aria-label="Share via SMS">
                            <span className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mx-auto"><MessageIcon className="w-6 h-6 text-blue-500" /></span>
                            <span className="text-xs mt-1 block">SMS</span>
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">Or copy the link</p>
                    <div className="relative flex items-center">
                        <Input 
                            id="share-url" 
                            value={url} 
                            readOnly 
                            className="pr-20"
                        />
                        <Button 
                            onClick={handleCopy} 
                            variant="secondary"
                            className="absolute right-1 top-1 bottom-1 px-3 text-sm"
                            style={{width: 'auto'}}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ShareModal;