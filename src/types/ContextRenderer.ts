import type { Upload } from './Upload.ts';

declare module '@hono/hono' {
	interface ContextRenderer {
		(data: {
			upload: Upload;
		}): Response | Promise<Response>;
	}
}
