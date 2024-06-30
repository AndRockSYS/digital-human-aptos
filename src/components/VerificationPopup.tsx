'use state';

import Image from 'next/image';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import MintingProcess from './MintingProcess';

import './verification-popup.css';

interface Props {
    dataType: string;
    mintingFunction: () => Promise<void>;
    setVerification: (value: React.SetStateAction<boolean>) => void;
}

export default function VerificationPopup({ dataType, mintingFunction, setVerification }: Props) {
    const router = useRouter();

    const [isMinting, setIsMinting] = useState(false);

    return (
        <>
            <section className='verification'>
                <Image
                    id='next-button'
                    src='/icons/prev-button.svg'
                    alt='next'
                    height={72}
                    width={72}
                    onClick={() => setVerification(false)}
                />
                <h1>{dataType.charAt(0).toUpperCase() + dataType.slice(1)} Verification</h1>
                <h6>
                    {`Thanks for providing your ${dataType} data! The ${dataType} data collected in the previous step
                will be minted into a verification token on Aptos and will be encrypted with Aptos
                primitive cryptography system to ensure maximum confidential.`}
                </h6>
                <button
                    id='green-button'
                    onClick={async () => {
                        setIsMinting(true);
                        await mintingFunction();
                        //todo wait for the transcation to pass
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                        router.push('/digital-id');
                    }}
                >
                    Confirm and start verification
                </button>
            </section>
            {useMemo(
                () => (isMinting ? <MintingProcess dataType={dataType} /> : <></>),
                [isMinting]
            )}
        </>
    );
}
