import { WEBSITE, WHO_AM_I } from '../../utils.ts';
import { StylesLink } from './Styles.tsx';
import type { Upload } from '../../types/Upload.ts';

export default (upload: Upload, src: string) => {
	const Media = () =>
		upload.type.includes('video')
			? <video class='media' controls src={src}></video>
			: <img class='media' src={src}></img>;
	return (
		<html>
			<head>
				<title>{upload.filename}</title>
				<StylesLink />
			</head>
			<body class='h-screen flex flex-col flex-center font-sans dark:bg-slate-800 dark:text-slate-100'>
				<div class='text-center'>
					<h1 class='font-bold text-xl'>{upload.filename}</h1>
					<p class='font-mono'>{upload.type}</p>
				</div>
				<Media />
				<p class='italic'>
					Hosted by <a target='_blank' href={WEBSITE} class='font-bold hover:underline'>{WHO_AM_I}</a>
				</p>
			</body>
		</html>
	);
};
