import Log from './Log.ts';
import pkg from '../deno.json' with { type: 'json' };
import * as path from '@std/path';

/**
 * Logger
 */
export const log = new Log(`${pkg.name.split('/')[1]} v${pkg.version} |`);

/**
 * Path joiner
 */
export const join = (...args: string[]) => path.join(Deno.cwd(), ...args);
