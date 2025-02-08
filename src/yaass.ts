import { init as initDatabase } from './db.ts';
import { log } from './utils.ts';
import handler from './web.ts';

// Initialize database
await initDatabase();

// Host Deno server
Deno.serve({
	port: 6969,
	handler,
	onListen: ({ port, hostname }) => log.info(`server started: http://${hostname}:${port}`),
});
