import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import Login from '../pages/Login.tsx';
import { join } from '@std/path/join';

const route = new Hono();

route.get('/', (ctx) => ctx.html(Login()));

route.get('/swap.js', async (ctx) => {
	ctx.header('Content-Type', 'text/javascript');
	return ctx.body(await Deno.readTextFile(join('src/web/js/login-swap.js')));
});

export default route;
