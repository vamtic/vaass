import { DB } from './database/db.ts';
import { isDocker, log } from './utils.ts';
import handler from './web/server.ts';

log.info(`[bun ${Bun.version_with_sha}] [${isDocker ? 'container' : 'native'}]`);
DB.init();

// Host Bun server
Bun.serve({
	port: 6969,
	fetch: handler,
});

log.info(`server started: http://0.0.0.0:6969`);
