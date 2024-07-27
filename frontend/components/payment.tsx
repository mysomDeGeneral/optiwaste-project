import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL

interface PaymentComponentProps {
    initialEmail?: string;
    initialAmount?: string;
    requestId?: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ initialEmail, initialAmount, requestId }) => {
    const [email, setEmail] = useState(initialEmail);
    const [amount, setAmount] = useState(initialAmount || "");
    const router = useRouter();
    const { user } = useAuth();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/payment/initialize-payment`, {
                amount: parseFloat(amount),
                email,
                reference: requestId,
                callbackUrl: `${CALLBACK_URL}/${requestId}`,
            });
            console.log('url:', response);
            router.push(response.data.data.authorization_url);
        } catch (error) {
            console.error('Payment initialization failed:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-green-500">
                <h2 className="text-2xl font-bold text-white text-center">Payment Details</h2>
            </div>
            <form onSubmit={handlePayment} className="px-6 py-8 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full px-3 py-4 text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none hover:bg-green-600 transition-colors duration-300"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentComponent;