import { Hono } from '@hono/hono';
import { join, WHO_AM_I } from '../utils.ts';

const app = new Hono();

// domain middleware
app.use((ctx, next) => (ctx.set('domain', new URL(ctx.req.url).origin), next()));

app.get('/favicon.ico', async (ctx) => {
	ctx.header('Content-Type', 'image/x-icon');
	return ctx.body(await Deno.readFile(join('assets/yaass.ico')));
});
app.get('/favicon.png', async (ctx) => {
	ctx.header('Content-Type', 'image/png');
	return ctx.body(await Deno.readFile(join('assets/yaass-logo.png')));
});

// routes
app.route('/stylesheet.css', (await import('./routes/stylesheet.css.ts')).default);
app.route('/dashboard', (await import('./routes/dashboard.ts')).default);
app.route('/login', (await import('./routes/login.ts')).default);
app.route('/upload', (await import('./routes/upload.ts')).default);
app.route('/', (await import('./routes/needle.ts')).default);
app.get('/', (ctx) => ctx.text(WHO_AM_I));

export default app.fetch;
