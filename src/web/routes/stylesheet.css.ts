import { Hono } from 'hono';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import cssnano from 'cssnano';

const route = new Hono();
const cssFile = './src/web/css/tailwind.css';

export const generate = async () =>
	await postcss([tailwindcss({ base: process.cwd() }), cssnano()])
		.process(await Bun.file(cssFile).text(), { from: cssFile });

route.get('/', async (ctx) => {
	ctx.header('Content-Type', 'text/css');
	return ctx.body((await generate()).css);
});

export default route;
