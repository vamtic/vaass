import { Hono } from '@hono/hono';
import { crypto } from '@std/crypto';
import { encodeHex as hex } from '@std/encoding/hex';
import { monotonicUlid as ulid } from '@std/ulid';
import { toArrayBuffer } from '@std/streams';
import { generateRandomString, join, log } from '../../utils.ts';
import { DB } from '../../database/db.ts';
import type { Upload } from '../../types/Upload.ts';

const generateShortId = async (options: {
	method: 'default' | 'gfycat';
	size: number;
	gfySize?: number;
}) => {
	// todo: optimize
	if (options.method == 'gfycat') {
		const sz = options.gfySize ? options.gfySize : 2;
		const getWord = (list: string[], delim = '') => list[Math.floor(Math.random() * list.length)].concat(delim);

		const adjectives = (await Deno.readTextFile(join('./assets/gfycat/adjectives.txt'))).split('\n');
		const animals = (await Deno.readTextFile(join('./assets/gfycat/animals.txt'))).split('\n');

		let gfycat = '';
		for (let i = 0; i < sz; i++) {
			gfycat += getWord(adjectives, '-');
		}
		return gfycat.concat(getWord(animals));
	}

	return generateRandomString(options.size);
};

const route = new Hono();

route.post('/', async (ctx) => {
	const body = await ctx.req.formData();

	if (!body.has('file')) {
		ctx.status(400);
		return ctx.text('file parameter missing');
	}

	// Get file from body
	const file = body.get('file') as File;

	// File details
	const uid = ulid();
	const nameOnDisk = `${uid}.${file.name.includes('.') ? file.name.split('.').pop() : 'unknown'}`;
	const location = 'data/uploads/' + nameOnDisk;
	const stream = file.stream();

	// Save file to disk
	await Deno.writeFile(join(location), stream);

	// Save details to database
	const upload: Upload = {
		uid,
		sid: await generateShortId({
			method: ctx.req.header('x-yaass-sid-method') == 'gfycat' ? 'gfycat' : 'default',
			size: 10,
		}),
		filename: file.name,
		location,
		timestamp: file.lastModified,
		hash: hex(await crypto.subtle.digest('BLAKE3', await toArrayBuffer(stream))),
		type: file.type,
		size: file.size,
		uploader_uid: '',
	};
	DB.putUpload(upload);

	log.info(`uploaded: ${upload.sid} [${upload.type}] [${upload.filename}] [${uid}]`);

	return ctx.json({ url: `${ctx.get('domain')}/${upload.sid}` });
});

export default route;
