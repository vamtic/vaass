import { Hono } from '@hono/hono';
import { Database } from '@db/sqlite';
import { ensureDirSync } from '@std/fs';

ensureDirSync('data');

const app = new Hono();
const db = new Database('data/yaass.db');

app.get('/', (c) => c.text('Hello Deno!'));

Deno.serve({ port: 6969 }, app.fetch);
