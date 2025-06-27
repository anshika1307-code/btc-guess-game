import { createAppKit } from '@reown/appkit/react'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { bitcoin } from '@reown/appkit/networks'

const projectId = '85f5696ebb357e331996a3cbe9d165ec'

const metadata = {
  name: 'AppKit',
  description: 'AppKit Bitcoin Example',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export function initializeAppKit() {
  const bitcoinAdapter = new BitcoinAdapter({ projectId });

  return createAppKit({
    adapters: [bitcoinAdapter],
    networks: [bitcoin],
    metadata,
    projectId,
    features: {
      analytics: true,
      email: false,
      socials: []
    }
  });
}

// import { useEffect, useState } from 'react';
// import { Core } from '@walletconnect/core'
// import { WalletKit, IWalletKit } from '@reown/walletkit'
// import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'; 
// import { bitcoin } from '@reown/appkit/networks'; // shared network config

// const projectId = 'fbe529b2d4630b5cb253db67f6ecc659'; 

// const metadata = {
//   name: 'WalletKit',
//   description: 'WalletKit Bitcoin Example',
//   url: 'https://example.com',
//   icons: ['https://avatars.githubusercontent.com/u/179229932'],
// };
// const [walletKit, setWalletKit] = useState<IWalletKit | null>(null)
// useEffect(() => {
//     async function initKit() {
//       const core = new Core({ projectId: projectId })
//       const kit = await WalletKit.init({
//         core,
//         metadata: {
//           name: 'My NextJS Wallet',
//           description: 'A web wallet built with WalletKit',
//           url: window.location.origin,
//           icons: [],
//         },
//       })
//       setWalletKit(kit)
//       // Optionally expose globally: window.walletKit = kit
//     }
//     initKit()
//   }, [])
// // export function initializeWalletKit() {
// //   const bitcoinAdapter = new BitcoinAdapter({ projectId });

// //   return createWalletKit({
// //     adapters: [bitcoinAdapter],
// //     networks: [bitcoin],
// //     metadata,
// //     projectId,
// //     features: {
// //       analytics: true,
// //       email: false,
// //       socials: [],
// //     },
// //   });
// // }
