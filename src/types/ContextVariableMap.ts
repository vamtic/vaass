declare module 'hono' {
	interface ContextVariableMap {
		/**
		 * A kérés által használt domain (opcionálisan porttal együtt)
		 */
		domain: string;
	}
}