'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWalletName } from 'petra-plugin-wallet-adapter';

export default function DataLayout() {
    const { account, connect, disconnect } = useWallet();

    useEffect(() => {
        if (account?.address) connect(PetraWalletName);
    }, [account]);

    return (
        <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Image id='gray-logo' src='/icons/logo.svg' alt='logo' width={43} height={39} />
            <button id='gray-button' onClick={disconnect}>
                Disconnect Wallet
            </button>
        </nav>
    );
}
