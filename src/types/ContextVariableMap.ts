declare module '@hono/hono' {
	interface ContextVariableMap {
		/**
		 * Domain (and optionally port) the request was called via
		 */
		domain: string;
	}
}
