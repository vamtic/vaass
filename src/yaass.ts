import { DB } from './db.ts';
import { isDocker, log } from './utils.ts';
import handler from './web/server.ts';

log.info(`starting... [${Deno.hostname()}] [${isDocker ? 'container' : 'native'}]`);
DB.init();

// Host Deno server
Deno.serve({
	port: 6969,
	handler,
	onListen: ({ port, hostname }) => log.info(`server started: http://${hostname}:${port}`),
});
