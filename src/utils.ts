import pkg from '../package.json';
import * as path from 'node:path';
import crypto from 'node:crypto';
import Log from '@tycrek/log';
import { mkdir } from 'node:fs/promises';

export const WHO_AM_I = `${pkg.name} v${pkg.version}`;
export const WEBSITE = pkg.website;

/**
 * Naplózó
 */
export const log = new Log({ prefix: WHO_AM_I, showTimestamps: true, separator: '>' });

/**
 * Útvonal-összeállító
 */
export const join = (...args: string[]) => path.join(process.cwd(), ...args);

export function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

// ! titkos tároló (ha valaki tudja, hogy ez rossz gyakorlat-e, kérem szóljon)
await mkdir('data/uploads', { recursive: true });
await Bun.write(join('data/.secret'), crypto.getRandomValues(new Uint32Array(16)).join(''));

export async function SECRET() {
	return await Bun.file(join('data/.secret')).text();
}