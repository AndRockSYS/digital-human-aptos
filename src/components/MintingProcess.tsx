'use client';

import Image from 'next/image';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import './process.css';

interface Props {
    dataType: string;
}

export default function MintingProcess({ dataType }: Props) {
    const { account } = useWallet();

    return (
        <section className='process'>
            <Image id='gray-logo' src='/icons/logo.svg' alt='logo' width={43} height={39} />
            <h1>
                Minting {dataType.charAt(0).toUpperCase() + dataType.slice(1)} Verification Token...
            </h1>
            <div className='address'>
                <h6>{account?.address}</h6>
            </div>
            <h6>
                Hey, you&apos;re almost there! Please be patient and do not close the window or
                refresh this page as it might affect the progress of the verification token minting.
            </h6>
            <div className='progress'></div>
        </section>
    );
}
