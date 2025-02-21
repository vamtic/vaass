import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';
import Login from '../components/Login.tsx';

const route = new Hono();

route.get('/', async (ctx) => {
	return ctx.html(Login());
});

export default route;
