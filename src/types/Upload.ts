export type Upload = {
	/**
	 * SQLite internal identifier
	 */
	_id?: number;

	/**
	 * Unique identifier (ULID format)
	 */
	uid: string;

	/**
	 * Short identifier
	 */
	sid: string;

	/**
	 * Original filename
	 */
	filename: string;

	/**
	 * Location on disk relative to yaass root
	 */
	location: string;

	/**
	 * Unix timestamp of when this file was uploaded
	 */
	timestamp: number;

	/**
	 * Hash of the file contents (BLAKE3)
	 */
	hash: string;

	/**
	 * Mimetype
	 */
	type: string;

	/**
	 * Size in bytes
	 */
	size: number;

	/**
	 * Unique identifier of the user that uploaded this
	 */
	uploader_uid: string;
};
