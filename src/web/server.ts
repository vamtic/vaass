import { Hono } from '@hono/hono';
import { WHO_AM_I } from '../utils.ts';

const app = new Hono();

// domain middleware
app.use((ctx, next) => (ctx.set('domain', new URL(ctx.req.url).origin), next()));

// routes
app.route('/stylesheet.css', (await import('./routes/stylesheet.css.ts')).default);
app.route('/dashboard', (await import('./routes/dashboard.ts')).default);
app.route('/login', (await import('./routes/login.ts')).default);
app.route('/upload', (await import('./routes/upload.ts')).default);
app.route('/', (await import('./routes/needle.ts')).default)
	.get((ctx) => ctx.text(WHO_AM_I));

export default app.fetch;
