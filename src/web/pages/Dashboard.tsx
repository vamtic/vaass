import Head from '../components/Head.tsx';
import type { Upload } from '../../types/Upload.ts';
import type { User } from '../../types/User.ts';

export default (user: User) => {
	return (
		<html>
			<Head title='Dashboard' />
			<body>
				<h1>Welcome, {user.name}</h1>
			</body>
		</html>
	);
};
