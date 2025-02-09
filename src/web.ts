import { Hono } from '@hono/hono';
import { crypto } from '@std/crypto';
import { encodeHex as hex } from '@std/encoding/hex';
import { generateRandomString, join, log, WHO_AM_I } from './utils.ts';
import { DB } from './db.ts';
import type { Upload } from './types/Upload.ts';

// Set up Hono
const app = new Hono();

// File upload
app.post('/upload', async (ctx) => {
	const body = await ctx.req.formData();

	if (!body.has('file')) {
		ctx.status(400);
		return ctx.text('file parameter missing');
	}

	// Get file from body
	const file = body.get('file') as File;

	// File details
	const uid = hex(await crypto.subtle.digest('BLAKE3', new TextEncoder().encode(file.name + file.lastModified)));
	const nameOnDisk = `${uid}.${file.name.includes('.') ? file.name.split('.').pop() : 'unknown'}`;
	const location = 'data/uploads/' + nameOnDisk;
	const stream = file.stream();

	// Save file to disk
	await Deno.writeFile(join(location), stream);

	// Save details to database
	const upload: Upload = {
		uid,
		sid: generateRandomString(10),
		filename: file.name,
		location,
		timestamp: file.lastModified,
		hash: hex(await crypto.subtle.digest('BLAKE3', stream)),
		type: file.type,
		size: file.size,
		uploader_uid: '',
	};
	DB.putUpload(upload);
	log.info(`uploaded: ${upload.sid} (${upload.type} ${upload.filename})`);

	return ctx.json({ sid: upload.sid });
});

// Uploads lookup
app.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'download' | undefined;

	const upload = DB.getUpload('sid', needle);
	if (!upload) {
		ctx.status(404);
		return ctx.text('not found');
	}

	ctx.header('Content-Length', `${upload.size}`);
	ctx.header('Content-Type', upload.type);
	ctx.header(
		'Content-Disposition',
		`${disposition == 'download' ? 'attachment' : 'inline'}; filename=${upload.filename}`,
	);
	return ctx.body((await Deno.readFile(upload.location)).buffer);
});

// Default index
app.get('/', (ctx) => ctx.text(WHO_AM_I));

export default app.fetch;
