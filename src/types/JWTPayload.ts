import type { JWTPayload as _JWTPayload } from 'hono/utils/jwt/types';

export type JWTPayload = _JWTPayload & {
	/**
	 * The users ID
	 */
	user: string;
};
