import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import Login from '../pages/Login.tsx';

const route = new Hono();

route.get('/', async (ctx) => {
	return ctx.html(Login());
});

export default route;
