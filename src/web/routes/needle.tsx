import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';
import { StylesLink } from '../components/Styles.tsx';

const route = new Hono();

route.use('/*', async (ctx, next) => {
	ctx.setRenderer(({ upload }) => {
		const src = `${ctx.get('domain')}/${upload.sid}/inline`;

		const Media = () =>
			upload.type.includes('video')
				? <video class='media' controls src={src}></video>
				: <img class='media' src={src}></img>;

		return ctx.html(
			<html>
				<head>
					<title>{upload.filename}</title>
					<StylesLink />
				</head>
				<body class='h-screen flex flex-col items-center justify-center font-sans dark:bg-slate-800 dark:text-slate-100'>
					<div class='text-center'>
						<h1 class='font-bold text-xl'>{upload.filename}</h1>
						<p class='font-mono'>{upload.type}</p>
					</div>
					<Media />
				</body>
			</html>,
		);
	});
	await next();
});

route.get('/:needle/:disposition?', async (ctx) => {
	const needle = ctx.req.param('needle');
	const disposition = ctx.req.param('disposition') as 'attachment' | 'inline' | undefined;

	const upload = DB.getUpload(needle);
	if (!upload) return ctx.notFound();

	if (disposition == 'attachment' || disposition == 'inline') {
		ctx.header('Content-Length', `${upload.size}`);
		ctx.header('Content-Type', upload.type);
		ctx.header('Content-Disposition', `${disposition}; filename=${upload.filename}`);
		return ctx.body((await Deno.readFile(upload.location)).buffer);
	}

	return ctx.render({ upload });
});

export default route;
