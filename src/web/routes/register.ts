import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import LoginRegister from '../pages/LoginRegister.tsx';

const route = new Hono();

route.get('/', (ctx) => ctx.html(LoginRegister('register')));

route.post('/', (ctx) => {
	const form = ctx.req.formData() as unknown as { username: string; password: string };
	return ctx.redirect('/dashboard');
});

export default route;
