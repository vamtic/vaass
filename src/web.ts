import { Hono } from '@hono/hono';

// Set up Hono
const app = new Hono();

app.get('/', (c) => c.text('Hello Deno!'));

export default app.fetch;
