import { ensureDir } from '@std/fs';
import { Database } from '@db/sqlite';
import { log } from '../utils.ts';
import type { Upload } from '../types/Upload.ts';

// Prepare database on filesystem
await ensureDir('data/uploads');
const database = new Database('data/yaass.db');

export const DB = {
	init: () => {
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
			location TEXT,
			timestamp NUMBER,
			hash TEXT,
			type TEXT,
			size NUMBER,
			uploader_uid TEXT
		);`,
		).run();

		log.info(`using sqlite ${version}`);
		return;
	},

	putUpload: (image: Upload) =>
		database.prepare(`
			INSERT INTO uploads (uid, sid, filename, location, timestamp, hash, type, size, uploader_uid)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`).run(
			image.uid,
			image.sid,
			image.filename,
			image.location,
			image.timestamp,
			image.hash,
			image.type,
			image.size,
			image.uploader_uid,
		),

	getUpload: (needle: string) =>
		database.prepare(`SELECT * FROM uploads WHERE uid = ? OR sid = ?;`).get<Upload>(needle, needle),

	getUploads: (needle: string) =>
		database.prepare(`SELECT * FROM uploads WHERE uploader_uid = ? OR filehash = ?;`).all<Upload>(needle, needle),
};
