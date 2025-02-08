import Log from './Log.ts';
import pkg from '../deno.json' with { type: 'json' };
import * as path from '@std/path';

export const WHO_AM_I = `${pkg.name.split('/')[1]} v${pkg.version}`;

/**
 * Logger
 */
export const log = new Log(`${WHO_AM_I} |`);

/**
 * Path joiner
 */
export const join = (...args: string[]) => path.join(Deno.cwd(), ...args);
