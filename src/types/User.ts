export type User = {
	/**
	 * SQLite internal identifier
	 */
	_id?: string;

	/**
	 * Unique identifier (ULID format)
	 */
	uid: string;

	/**
	 * Display name
	 */
	name: string;

	/**
	 * Username, used for sign-in
	 */
	username: string;

	/**
	 * Password hash
	 */
	passhash: string;

	/**
	 * Is the user the owner of the server?
	 */
	owner: boolean;

	/**
	 * JSON of additional meta details. WIP
	 */
	meta: string;
};
