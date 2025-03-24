import { Hono } from '@hono/hono';
import { stream as honostream } from '@hono/hono/streaming';
import { log } from '../../utils.ts';
import { DB } from '../../database/db.ts';
import Needle from '../pages/Needle.tsx';

const route = new Hono();

route.get('/:needle/:disposition?', (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'attachment' | 'inline' | undefined;

	const upload = DB.getUpload(needle);
	if (!upload) return ctx.notFound();

	// * temporary condition to load inline images on discord
	// todo: replace with the fancy embed thing i forgot the name of
	if (ctx.req.header('User-Agent')?.includes('discord') && disposition != 'inline') {
		return ctx.redirect(ctx.req.path.concat('/inline'));
	}

	if (disposition == 'attachment' || disposition == 'inline') {
		ctx.header('Content-Length', `${upload.size}`);
		ctx.header('Content-Type', upload.type);
		ctx.header('Content-Disposition', `${disposition}; filename=${upload.filename}`);
		ctx.header('Cache-Control', 'public, max-age=2592000'); // 1 month
		ctx.header('Accept-Ranges', 'bytes');

		return honostream(ctx, async (stream) => {
			stream.onAbort(() => log.warn(`stream aborted!`));

			// asynchronously pipe file as response
			using file = await Deno.open(upload.location, { read: true });
			await stream.pipe(file.readable);
		}, (err, stream) => {
			log.error(`${err.name}: ${err.message}\n${err.stack}`);
			return Promise.resolve(stream.abort());
		});
	}

	return ctx.html(Needle(upload, `${upload.sid}/inline`));
});

export default route;
