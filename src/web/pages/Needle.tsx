import { WEBSITE, WHO_AM_I } from '../../utils.ts';
import Head from '../components/Head.tsx';
import type { Upload } from '../../types/Upload.ts';

export default (upload: Upload, src: string) => {
	const Media = () =>
		upload.type.includes('video') ? <video class='media' controls src={src}></video> : <img class='media' src={src}></img>;
	return (
		<html>
			<Head title={upload.filename} />
			<body class='h-screen flex flex-col flex-center'>
				<div class='text-center'>
					<h1 class='font-bold text-xl'>{upload.filename}</h1>
					<p class='font-mono'>{upload.type}</p>
				</div>
				<Media />
				<p class='italic'>
					Üzemeltető: <a target='_blank' href={WEBSITE} class='font-bold hover:underline'>{WHO_AM_I}</a>
				</p>
			</body>
		</html>
	);
};
