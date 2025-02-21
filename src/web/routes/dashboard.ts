import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../db.ts';
import Dashboard from '../pages/Dashboard.tsx';

const route = new Hono();

route.get('/', (ctx) => !getCookie(ctx, 'yaass') ? ctx.redirect('/login') : ctx.html(Dashboard()));

export default route;
