import { Hono } from '@hono/hono';
import { crypto } from '@std/crypto';
import { encodeHex } from '@std/encoding/hex';
import { join, log, WHO_AM_I } from './utils.ts';

// Set up Hono
const app = new Hono();

app.get('/', (ctx) => ctx.text(WHO_AM_I));

app.post('/upload', async (ctx) => {
	const body = await ctx.req.formData();

	if (!body.has('file')) {
		ctx.status(400);
		return ctx.text('file parameter missing');
	}

	// Get file from body
	const file = body.get('file') as File;

	const uid = encodeHex(await crypto.subtle.digest('BLAKE3', new TextEncoder().encode(`${file.name}${Date.now()}`)));
	const filename = `${uid}.${file.name.split('.').pop()}`;

	// Save file to disk
	await Deno.writeFile(join('data/uploads', filename), file.stream());

	return ctx.json({ url: `http://wip/tbd` });
});

export default app.fetch;
