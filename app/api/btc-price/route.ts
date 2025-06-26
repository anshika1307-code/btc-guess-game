
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET() {
//   try {
//     const res = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
//     const btcUsd = parseFloat(res.data.data.amount);

//     return NextResponse.json({ btc_usd: btcUsd });
//   } catch (error) {
//     console.error('Coinbase API Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch BTC price' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import axios from 'axios';


let cachedPrice: number | null = null;
let lastFetchedTime: number = 0;
export async function GET() {
    const now = Date.now();

    if (cachedPrice !== null && now - lastFetchedTime < 60_000) {
        return NextResponse.json({ btc_usd: cachedPrice });
    }

    try {
        const res = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const btcUsd = parseFloat(res.data.data.amount);


        cachedPrice = btcUsd;
        lastFetchedTime = now;

        return NextResponse.json({ btc_usd: btcUsd });
    } catch (error) {
        console.error('Coinbase API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch BTC price' }, { status: 500 });
    }
}
