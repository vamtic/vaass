import Log from './Log.ts';
import pkg from '../deno.json' with { type: 'json' };
import * as path from '@std/path';

export const WHO_AM_I = `${pkg.name.split('/')[1]} v${pkg.version}`;

/**
 * Logger
 */
export const log = new Log(`${WHO_AM_I} |`);

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
