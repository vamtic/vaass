import { ensureDir } from '@std/fs';
import { Database } from '@db/sqlite';
import { log } from './utils.ts';

// Prepare database on filesystem
await ensureDir('data/uploads');
const database = new Database('data/yaass.db');

export function init() {
	const [version] = database.prepare('select sqlite_version();').value<[string]>()!;

	// Create users table
	database.prepare(
		`CREATE TABLE IF NOT EXISTS users (
			_id INTEGER PRIMARY KEY AUTOINCREMENT,
			uid TEXT,
			name TEXT,
			username TEXT,
			passhash TEXT,
			meta TEXT
		);`,
	).run();

	// Create uploads table
	database.prepare(
		`CREATE TABLE IF NOT EXISTS uploads (
			_id INTEGER PRIMARY KEY AUTOINCREMENT,
			uid TEXT,
			sid TEXT,
			filename TEXT,
			timestamp TEXT,
			filehash TEXT,
			uploader_uid TEXT
		);`,
	).run();

	log.info(`using sqlite ${version}`);
	return;
}

export function get() {}

export function put() {}
