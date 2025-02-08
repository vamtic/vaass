import { Hono } from '@hono/hono';
import { init as initDatabase } from './db.ts';
import { log } from './utils.ts';

// Initialize database
await initDatabase();

// Set up Hono
const app = new Hono();

app.get('/', (c) => c.text('Hello Deno!'));

Deno.serve({
	port: 6969,
	handler: app.fetch,
	onListen: ({ port, hostname }) => log.info(`server started: http://${hostname}:${port}`),
});
