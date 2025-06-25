export type Upload = {
	/**
	 * SQLite belső azonosító
	 */
	_id?: number;

	/**
	 * Egyedi azonosító (ULID formátum)
	 */
	uid: string;

	/**
	 * Rövid azonosító
	 */
	sid: string;

	/**
	 * Eredeti fájlnév
	 */
	filename: string;

	/**
	 * Fájl elérési útja a yaass gyökérkönyvtárához képest
	 */
	location: string;

	/**
	 * Unix időbélyeg a feltöltés időpontjáról
	 */
	timestamp: number;

	/**
	 * A fájl tartalmának hash-e (BLAKE3)
	 */
	hash: string;

	/**
	 * MIME típus
	 */
	type: string;

	/**
	 * Méret bájtokban
	 */
	size: number;

	/**
	 * A feltöltő felhasználó egyedi azonosítója
	 */
	uploader_uid: string;
};