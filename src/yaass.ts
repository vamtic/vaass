import { Hono } from '@hono/hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello Deno!'));

Deno.serve({ port: 6969 }, app.fetch);
