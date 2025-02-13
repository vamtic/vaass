import { Hono } from '@hono/hono';
import { DB } from '../../src/db.ts';

const app = new Hono();

app.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'download' | undefined;

	const upload = DB.getUpload(needle);
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

export default app;
