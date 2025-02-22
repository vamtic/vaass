import { Hono } from '@hono/hono';
import { setCookie } from '@hono/hono/cookie';
import { sign } from '@hono/hono/jwt';
import { DB } from '../../database/db.ts';
import { join, log, SECRET } from '../../utils.ts';
import { verify } from '../password.ts';
import LoginRegister from '../pages/LoginRegister.tsx';
import type { JWTPayload } from '../../types/JWTPayload.ts';

async function jwt(uid: string, timestamp: number) {
	return await sign(
		{
			user: uid,
			exp: timestamp + (72 * 60 * 60),
			nbf: timestamp,
			iat: timestamp,
		} as JWTPayload,
		await SECRET(),
		'HS512',
	);
}

const route = new Hono();

route.get('/', (ctx) => ctx.html(LoginRegister('login')));

route.get('/swap.js', async (ctx) => {
	ctx.header('Content-Type', 'text/javascript');
	return ctx.body(await Deno.readTextFile(join('src/web/js/login-swap.js')));
});

route.post('/', async (ctx) => {
	const form = await ctx.req.parseBody() as unknown as { username: string; password: string };
	if (form.username == '') return ctx.html(LoginRegister('login', 'Invalid username'));
	if (form.password == '') return ctx.html(LoginRegister('login', 'Invalid password'));

	const user = DB.getUser(form.username);
	if (user == null) return ctx.html(LoginRegister('login', 'Invalid username'));
	if (!verify(form.password, user.passhash)) return ctx.html(LoginRegister('login', 'Invalid password'));

	setCookie(ctx, 'yaass', await jwt(user.uid, Math.floor(Date.now() / 1000)), { secure: ctx.get('domain').startsWith('https') });
	log.info(`user authenticated [${user.username}] [${user.uid}]`);
	return ctx.redirect('/dashboard');
});

export default route;
