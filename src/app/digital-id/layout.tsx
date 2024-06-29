'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function DataLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { disconnect } = useWallet();

    return (
        <main className='nav'>
            <nav>
                <Image id='gray-logo' src='/icons/logo.svg' alt='logo' width={43} height={39} />
                <Link href={'/'} id='gray-button' onClick={disconnect}>
                    Disconnect Wallet
                </Link>
            </nav>
            {children}
        </main>
    );
}
