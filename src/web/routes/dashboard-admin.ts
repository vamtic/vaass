import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { getCookie } from 'hono/cookie';
import { DB } from '../../database/db.ts';
import { log, SECRET } from '../../utils.ts';
import Dashboard from '../pages/Dashboard.tsx';
import LoginRegister from '../pages/LoginRegister.tsx';
import type { JWTPayload } from '../../types/JWTPayload.ts';
import Admin from '../pages/Admin.tsx';

const route = new Hono();

route.get('/', async (ctx) => {
	const unauthResponse = () =>
		ctx.html(LoginRegister({ mode: 'login', page: ctx.req.path === '/admin' || ctx.req.query('page') === 'admin' ? 'admin' : 'dashboard', error: 'You must be logged in' }));
	const token = getCookie(ctx, 'yaass');

	if (!token) return unauthResponse();

	try {
		const payload = await verify(token, await SECRET(), 'HS512') as JWTPayload;
		const user = DB.getUser(payload.user);

		if (!user) return unauthResponse();

		// todo: improve admin check
		if (ctx.req.path === '/admin') return user.owner ? ctx.html(Admin()) : unauthResponse();

		return ctx.html(Dashboard(user));
	} catch (ex) {
		const err = ex as { name: string; message: string };
		log.error(`error: ${err.name}\n${ex}`);
		return unauthResponse();
	}
});

export default route;
