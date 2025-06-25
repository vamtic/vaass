import { DB } from './database/db.ts';
import { log } from './utils.ts';
import handler from './web/server.ts';

log.info(`[bun ${Bun.version_with_sha}] [native]`);
DB.init();

// Bun szerver indítása
Bun.serve({
	port: 6969,
	fetch: handler,
});

log.info(`A szerver elindult: http://0.0.0.0:6969`);
