import { WEBSITE, WHO_AM_I } from '../../utils.ts';
import { StylesLink } from './Styles.tsx';
import type { Upload } from '../../types/Upload.ts';

export default () => {
	return (
		<html>
			<head>
				<title>Dashboard</title>
				<StylesLink />
			</head>
		</html>
	);
};
