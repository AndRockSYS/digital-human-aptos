'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import pageData from './pageData';

export default function DataCollection() {
    const dataType = usePathname().split('/')[2];
    const data = pageData[dataType];

    return (
        <section>
            <h2>{data.name}</h2>
            <h6>{data.description}</h6>
            <section className='scan-methods'>
                <Image
                    className='device'
                    src={data.device.image}
                    alt='scanner-device'
                    height={277}
                    width={410}
                />
                <Image
                    className='upload'
                    src={data.upload.image}
                    alt='image-uploading'
                    height={228}
                    width={228}
                />
                <h3>{data.device.name}</h3>
                <h3>{data.upload.name}</h3>
                <h6>{data.device.by}</h6>
                <h6>{data.upload.by}</h6>
                <button id='disabled' disabled>
                    Connect to scanner
                </button>
                <button id='green-button'>{data.upload.buttonText}</button>
                <Link href={'/'}>Available Soon</Link>
                <Image
                    id='next-button'
                    src='/icons/next-button.svg'
                    alt='next'
                    height={72}
                    width={72}
                />
                <div className='filler'></div>
            </section>
        </section>
    );
}
