import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';

const route = new Hono();

route.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'attachment' | 'inline' | undefined;

	const upload = DB.getUpload(needle);
	if (!upload) {
		ctx.status(404);
		return ctx.text('not found');
	}

	if (disposition == 'attachment' || disposition == 'inline') {
		ctx.header('Content-Length', `${upload.size}`);
		ctx.header('Content-Type', upload.type);
		ctx.header('Content-Disposition', `${disposition}; filename=${upload.filename}`);
		return ctx.body((await Deno.readFile(upload.location)).buffer);
	} else {
		return ctx.render(
			<html>
			</html>,
		);
	}
});

export default route;
