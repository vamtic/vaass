import { Hono } from '@hono/hono';
import { Database } from '@db/sqlite';

const app = new Hono();
const db = new Database('yaass.db');

app.get('/', (c) => c.text('Hello Deno!'));

Deno.serve({ port: 6969 }, app.fetch);
