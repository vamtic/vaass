import { Hono } from '@hono/hono';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import cssnano from 'cssnano';

const route = new Hono();
const cssFile = './src/web/css/tailwind.css';

export const generate = async () =>
	await postcss([tailwindcss({ base: Deno.cwd() }), cssnano()])
		.process(await Deno.readTextFile(cssFile), { from: cssFile });

route.get('/', async (ctx) => {
	ctx.header('Content-Type', 'text/css');
	return ctx.body((await generate()).css);
});

export default route;
