import { StylesLink } from './Styles.tsx';
import type { PropsWithChildren } from '@hono/hono/jsx';

export default ({ title, children }: PropsWithChildren<{ title: string }>) => (
	<head>
		<title>{title}</title>
		<StylesLink />
		<link rel='icon' type='image/x-icon' href='/favicon.ico'></link>
		<link rel='icon' type='image/png' href='/favicon.png'></link>
		{children}
	</head>
);
