import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MailIcon } from '../components/icons/MailIcon';

const ContactUsPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Thank you, ${name}! Your message has been received.`);
            setName('');
            setEmail('');
            setMessage('');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <Card title="Get in Touch">
                <p className="text-gray-600 mb-4">We'd love to hear from you! Reach out to us through any of the methods below.</p>
                <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                        <PhoneIcon className="w-5 h-5 mr-3 text-green-600" />
                        <span>+254 712 345 678</span>
                    </div>
                     <div className="flex items-center text-gray-700">
                        <MailIcon className="w-5 h-5 mr-3 text-green-600" />
                        <span>support@adsokoni.co.ke</span>
                    </div>
                </div>
            </Card>

            <Card title="Send us a Message">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Your Name"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Your Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <Button type="submit" isLoading={isSubmitting} disabled={!name || !email || !message}>
                        Send Message
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ContactUsPage;
