export type User = {
	/**
	 * SQLite belső azonosító
	 */
	_id?: string;

	/**
	 * Egyedi azonosító (ULID formátum)
	 */
	uid: string;

	/**
	 * Megjelenített név
	 */
	name: string;

	/**
	 * Felhasználónév, bejelentkezéshez használt
	 */
	username: string;

	/**
	 * Jelszó hash
	 */
	passhash: string;

	/**
	 * Feltöltési tokenek listája
	 */
	tokens: string;

	/**
	 * A felhasználó a szerver tulajdonosa?
	 */
	owner: boolean;

	/**
	 * További meta adatok JSON formátumban. Folyamatban lévő munka
	 */
	meta: string;
};