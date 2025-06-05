import Head from '../components/Head.tsx';
import type { Upload } from '../../types/Upload.ts';
import type { User } from '../../types/User.ts';

export default (user: User) => {
	return (
		<html>
			<Head title='Dashboard' />
			<body class='h-full flex flex-row'>
				<h1 class='font-bold text-7xl'>Welcome, {user.name}</h1>
				<h2 class='italic font-4xl'>Dashboard is a work in progress.</h2>
			</body>
		</html>
	);
};
