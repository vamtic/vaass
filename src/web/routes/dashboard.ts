import { Hono } from '@hono/hono';
import { DB } from '../../db.ts';
import Dashboard from '../components/Dashboard.tsx';

const route = new Hono();

route.get('/', async (ctx) => {
	return ctx.html(Dashboard());
});

export default route;
