import Image from 'next/image';

interface Props {
    img?: string;
    text: string;
}

export default function GreenButton({ img, text }: Props) {
    return (
        <button id='green-button'>
            {img ? <Image src={img} alt='icon' width={20} height={20} /> : <></>}
            {text}
        </button>
    );
}
