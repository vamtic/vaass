import { DB } from './database/db.ts';
import { isDocker, log } from './utils.ts';
import handler from './web/server.ts';

log.info(
	`[deno ${Deno.version.deno}] [typescript ${Deno.version.typescript}] ` +
		`[${Deno.hostname()}] [${isDocker ? 'container' : 'native'}]`,
);
DB.init();

// Host Deno server
Deno.serve({
	port: 6969,
	handler,
	onListen: ({ port, hostname }) => log.info(`server started: http://${hostname}:${port}`),
});
