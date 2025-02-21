import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import LoginRegister from '../pages/LoginRegister.tsx';
import { join } from '../../utils.ts';

const route = new Hono();

route.get('/', (ctx) => ctx.html(LoginRegister('login')));

route.get('/swap.js', async (ctx) => {
	ctx.header('Content-Type', 'text/javascript');
	return ctx.body(await Deno.readTextFile(join('src/web/js/login-swap.js')));
});

route.post('/', (ctx) => {
	const form = ctx.req.formData() as unknown as { username: string; password: string };
	return ctx.redirect('/dashboard');
});

export default route;
