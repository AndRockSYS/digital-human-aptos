import Image from 'next/image';

import GreenButton from '@/components/GreenButton';

import './home.css';

export default function Home() {
    return (
        <main className='home'>
            <Image src='/icons/logo.svg' alt='logo' width={53} height={48} />
            <h1>Digital Human Project</h1>
            <h5>The Only Proof of Personhood on Aptos.</h5>
            <div className='buttons'>
                <GreenButton img='/icons/aptos.svg' text='Generate Identity' />
                <button id='gray-button'>Connect Identity</button>
            </div>
            <div className='participants'>
                1 unique human participated <div className='line'></div>
            </div>
        </main>
    );
}
