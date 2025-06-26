'use client'
import { useEffect, useState } from 'react';

export default function PricePage() {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState(false);

    const fetchPrice = async () => {
        try {
            const res = await fetch('/api/btc-price');
            const data = await res.json();
            if (data?.btc_usd) {
                setPrice(data.btc_usd);
                setError(false);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Failed to fetch BTC price:', err);
            setError(true);
        }
    };

    useEffect(() => {
        fetchPrice();
        const interval = setInterval(fetchPrice, 60_000);
        return () => clearInterval(interval);

    }, []);

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">BTC/USD Price</h1>
            <p className="mt-4 text-xl">
                {error ? 'Error loading price' : price !== null ? `$${price}` : 'Loading...'}
            </p>
        </main>
    );
}
