import { StylesLink } from './Styles.tsx';
import type { PropsWithChildren } from 'hono/jsx';

export default ({ title, children }: PropsWithChildren<{ title: string }>) => (
	<head>
		<meta charset='UTF-8' />
		<meta name='viewport' content='width=device-width, initial-scale=1.0' />
		<title>{title}</title>
		<StylesLink />
		<link rel='icon' type='image/png' href='/favicon.png' />
		<link rel='icon' type='image/x-icon' href='/favicon.ico' />
		{children}
	</head>
);
