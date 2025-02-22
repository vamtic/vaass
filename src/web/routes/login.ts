import { Hono } from '@hono/hono';
import { setCookie /*, deleteCookie, getCookie, getSignedCookie, setSignedCookie */ } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import { join, log } from '../../utils.ts';
import { verify } from '../password.ts';
import LoginRegister from '../pages/LoginRegister.tsx';
import { ulid } from '@std/ulid';

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

	setCookie(ctx, 'yaass', ulid(), { secure: ctx.get('domain').startsWith('https') });
	log.info(`user authenticated [${user.username}] [${user.uid}]`);

	return ctx.redirect('/dashboard');
});

export default route;
