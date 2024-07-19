import React, { useState } from "react";
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

const PaymentComponent = ({ initialEmail= '', initialAmount = ''}) => {
    const [email, setEmail] = useState(initialEmail);
    const [amount, setAmount] = useState(initialAmount);

    const handlePayment = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/payments/initialize`, {
                amount: parseFloat(amount),
                email,
                callbackUrl: 'http://localhost:3000/users/requests/status'
            } );

            window.location.href = response.data.authorization_url;
        } catch (error) {
            console.error('Payment initialization failed:', error);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button type="submit">Pay Now</button>
        </form>
    );
};

export default PaymentComponent;