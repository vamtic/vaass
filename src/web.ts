import { Hono } from '@hono/hono';
import { WHO_AM_I } from './utils.ts';

// Set up Hono
const app = new Hono();

app.get('/', (ctx) => ctx.text(WHO_AM_I));

app.post('/upload', async (ctx) => {
	const file = (await ctx.req.formData()).get('file') as File;
	console.log(file.name, file);
	ctx.status(400);
	return ctx.text('not implemented');
});

export default app.fetch;
