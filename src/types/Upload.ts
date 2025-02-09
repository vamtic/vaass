export type Upload = {
	_id?: number;
	uid: string;
	sid: string;
	filename: string;
	location: string;
	timestamp: number;
	hash: string;
	type: string;
	size: number;
	uploader_uid: string;
};
