import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

const PaymentCallback = () => {
    const [paymentStatus, setPaymentStatus] = useState('');
    const router = useRouter();

    useEffect(() => {
        const verifyPayment = async () => {
            const reference = router.query.reference;

            if (reference) {
                try {
                    const response = await axios.get(`${API_URL}/payments/verify/${reference}`);
                    setPaymentStatus(response.data.status);
                } catch (error) {
                    console.error("Payment verification failed:", error);
                    setPaymentStatus('error');
                }
            }
        };

        if (router.isReady) {
            verifyPayment();
        }
    }, [router.isReady, router.query.reference]);

    if (!router.isReady) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {paymentStatus === 'success' && (
                <div>
                    <h1>Payment Successful</h1>
                    <p>Thank you for your payment</p>
                </div>
            )}

            {paymentStatus === 'error' && (
                <div>
                    <h1>Payment Failed</h1>
                    <p>Sorry, your payment failed</p>
                </div>
            )}

            {!paymentStatus && <div>Verifying payment...</div>}
        </div>
    );
}

export default PaymentCallback;