import Log from './Log.ts';
import pkg from '../deno.json' with { type: 'json' };
import * as path from '@std/path';
import { ensureDir, exists } from '@std/fs';
import { crypto } from '@std/crypto';

export const WHO_AM_I = `${pkg.name.split('/')[1]} v${pkg.version}`;
export const WEBSITE = pkg.website;

/**
 * Logger
 */
export const log = new Log(`${WHO_AM_I} |`);

/**
 * Are we in a Docker container?
 */
export const isDocker = await exists('/.dockerenv');

/**
 * Path joiner
 */
export const join = (...args: string[]) => path.join(Deno.cwd(), ...args);

export function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

// ! secret store (if someone knows if this is terrible practice please tell me)
await ensureDir('data/uploads');
await Deno.writeTextFile(join('data/.secret'), crypto.getRandomValues(new Uint32Array(16)).join(''));
export async function SECRET() {
	return await Deno.readTextFile(join('data/.secret'));
}
