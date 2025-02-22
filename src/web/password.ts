import { hash as Hash, verify as Verify } from '@stdext/crypto/hash/argon2';
import type { Argon2Options } from '@stdext/crypto/hash/argon2';

const options: Argon2Options = {
	algorithm: 'argon2id',
};

export const hash = (password: string) => Hash(password, options);
export const verify = (password: string, hash: string) => Verify(password, hash, options);
