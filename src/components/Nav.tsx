'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function DataLayout() {
    const { account, disconnect } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (account?.address) router.push('/');
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
