import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { createHash } from 'crypto';

export default function signMessage(message: string): number[] {
    const hashedMessage = createHash('sha512').update(message).digest('hex');

    const privateKey = new Ed25519PrivateKey(
        '0x21814ca126998fe612fb1dacfd0bfb6bcabe82c48a3fe56907ed8d14ebfb070a'
    );
    const signature = privateKey.sign(hashedMessage).toString();

    const result: number[] = [];
    for (let i = 0; i < signature.length; i += 2) {
        result.push(Number(`0x${signature.slice(i, i + 2)}`));
    }
    return result;
}
