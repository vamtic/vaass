import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';
import { StylesLink } from '../components/Styles.tsx';

const route = new Hono();

route.use('/*', async (ctx, next) => {
	ctx.setRenderer(({ upload }) => {
		const src = `${ctx.get('domain')}/${upload.sid}/inline`;
		const element = upload.type.includes('video') ? <video controls src={src}></video> : <img src={src}></img>;
		return ctx.html(
			<html>
				<head>
					<title>{upload.filename}</title>
					<StylesLink />
				</head>
				<body class='flex flex-col items-center justify-center bg-sky-300 text-xl'>
					<div>
						<h1>{upload.filename}</h1>
						<p>[{upload.type}]</p>
					</div>
					{element}
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
