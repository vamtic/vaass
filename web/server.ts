import { Hono } from '@hono/hono';
import { WHO_AM_I } from '../src/utils.ts';
// routes
import upload from './routes/upload.ts';
import needle from './routes/needle.ts';

const app = new Hono();

app.route('/upload', upload);
app.route('/', needle);
app.get('/', (ctx) => ctx.text(WHO_AM_I));

export default app.fetch;
