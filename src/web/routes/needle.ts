import { Hono } from 'hono';
import { DB } from '../../database/db.ts';
import Needle from '../pages/Needle.tsx';

const route = new Hono();

route.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'attachment' | 'inline' | undefined;

	const upload = DB.getUpload(needle);
	if (!upload) return ctx.notFound();

	// * átmeneti feltétel a Discord-on való képmegjelenítéshez
	// todo: cseréld le az embed-re (nem jut eszembe a neve)
	if (ctx.req.header('User-Agent')?.includes('discord') && disposition != 'inline') {
		return ctx.redirect(ctx.get('domain').concat(`/${needle}/inline`));
	}

	if (disposition == 'attachment' || disposition == 'inline') {
		ctx.header('Content-Length', `${upload.size}`);
		ctx.header('Content-Type', upload.type);
		ctx.header('Content-Disposition', `${disposition}; filename=${upload.filename}`);
		ctx.header('Cache-Control', 'public, max-age=2592000'); // 1 hónap
		ctx.header('Accept-Ranges', 'bytes');

		// todo: potenciális újraoptimalizálás?
		return ctx.body(await Bun.file(upload.location).arrayBuffer());
		/*return honostream(ctx, async (stream) => {
			stream.onAbort(() => log.warn(`stream megszakítva!`));

			// aszinkron fájlcímzés válaszként
			using file = await Deno.open(upload.location, { read: true });
			await stream.pipe(file.readable);
		}, (err, stream) => {
			log.error(`${err.name}: ${err.message}\n${err.stack}`);
			return Promise.resolve(stream.abort());
		});*/
	}

	return ctx.html(Needle(upload, `${ctx.get('domain')}/${upload.sid}/inline`));
});

export default route;