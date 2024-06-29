'use client';

import Image from 'next/image';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import './data.css';

export default function DataLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { disconnect } = useWallet();

    return (
        <main className='data'>
            <nav>
                <Image id='gray-logo' src='/icons/logo.svg' alt='logo' width={43} height={39} />
                <button id='gray-button' onClick={disconnect}>
                    Disconnect Wallet
                </button>
            </nav>
            {children}
        </main>
    );
}
