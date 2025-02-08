import { ensureDir } from '@std/fs';
import { Database } from '@db/sqlite';
import { log } from './utils.ts';

await ensureDir('data');

const database = new Database('data/yaass.db');

export async function init() {
	log.info('database initialized');
	await new Promise((res) => setTimeout(res, 1000));
	return Promise.resolve();
}

export function get() {}

export function put() {}
