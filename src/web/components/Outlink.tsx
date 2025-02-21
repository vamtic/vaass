import { WEBSITE, WHO_AM_I } from '../../utils.ts';
import type { PropsWithChildren } from '@hono/hono/jsx';

export default ({ children }: PropsWithChildren) => (
	<a href={WEBSITE} title='Visit homepage' target='_blank'>{children ?? WHO_AM_I}</a>
);
