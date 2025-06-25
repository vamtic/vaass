import { ulid } from '@std/ulid';
import { Hono } from 'hono';
// import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from '@hono/hono/cookie';
import { log } from '../../utils.ts';
import { DB } from '../../database/db.ts';
import LoginRegister from '../pages/LoginRegister.tsx';
import type { User } from '../../types/User.ts';

const route = new Hono();

route.get('/', (ctx) => ctx.html(LoginRegister({ mode: 'register' })));

route.post('/', async (ctx) => {
	const form = await ctx.req.parseBody() as unknown as { username: string; password: string; password2: string };
	if (form.username == '') return ctx.html(LoginRegister({ mode: 'register', error: 'Érvénytelen felhasználónév' }));
	if (form.password == '' || form.password2 == '') return ctx.html(LoginRegister({ mode: 'register', error: 'Érvénytelen jelszó' }));
	if (form.password !== form.password2) return ctx.html(LoginRegister({ mode: 'register', error: 'A jelszavaknak egyezniük kell' }));

	const checkUser = DB.getUser(form.username);
	if (checkUser != null) return ctx.html(LoginRegister({ mode: 'register', error: 'A felhasználónév foglalt' }));

	const newUser: User = {
		uid: ulid(),
		name: form.username[0]!.toUpperCase() + form.username.substring(1),
		username: form.username,
		passhash: await Bun.password.hash(form.password),
		tokens: '',
		owner: DB.getUsers().length === 0,
		meta: JSON.stringify({}),
	};

	DB.createUser(newUser);
	log.success(`felhasználó létrehozva [${newUser.username}] [${newUser.uid}]`);

	return ctx.redirect('/login');
});

export default route;