import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';
import Needle from '../pages/Needle.tsx';

const route = new Hono();

route.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'attachment' | 'inline' | undefined;

	const upload = DB.getUpload(needle);
	if (!upload) return ctx.notFound();

	// * temporary condition to load inline images on discord
	// todo: replace with the fancy embed thing i forgot the name of
	if (ctx.req.header('User-Agent')?.includes('discord') && disposition != 'inline') {
		return ctx.redirect(ctx.get('domain').concat(`/${needle}/inline`));
	}

	if (disposition == 'attachment' || disposition == 'inline') {
		ctx.header('Content-Length', `${upload.size}`);
		ctx.header('Content-Type', upload.type);
		ctx.header('Content-Disposition', `${disposition}; filename=${upload.filename}`);
		return ctx.body((await Deno.readFile(upload.location)).buffer);
	}

	return ctx.html(Needle(upload, `${ctx.get('domain')}/${upload.sid}/inline`));
});

export default route;
