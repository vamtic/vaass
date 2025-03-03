import { Hono } from '@hono/hono';
import { join, WHO_AM_I } from '../../utils.ts';

const route = new Hono();

route.get('/', async (ctx) => {
	// favicon loader
	if (ctx.req.url.endsWith('.ico') || ctx.req.url.endsWith('.png')) {
		const isPng = ctx.req.url.endsWith('.png');
		ctx.header('Content-Type', isPng ? 'image/png' : 'image/x-icon');
		return ctx.body(await Deno.readFile(join(`assets/eien.${isPng ? 'png' : 'ico'}`)));
	}

	return ctx.text(WHO_AM_I);
});

export default route;
