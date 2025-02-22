import { Hono } from '@hono/hono';
import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { DB } from '../../database/db.ts';
import Dashboard from '../pages/Dashboard.tsx';
import LoginRegister from '../pages/LoginRegister.tsx';

const route = new Hono();

route.get('/', (ctx) => ctx.html(!getCookie(ctx, 'yaass') ? LoginRegister('login') : Dashboard()));

export default route;
