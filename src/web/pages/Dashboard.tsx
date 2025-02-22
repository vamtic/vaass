import Head from '../components/Head.tsx';
import type { Upload } from '../../types/Upload.ts';
import type { User } from '../../types/User.ts';

export default (user: User) => {
	return (
		<html>
			<Head title='Dashboard' />
			<body class='h-full flex flex-row'>
				<div class='h-full flex-none flex flex-col justify-center items-center p-16 gap-8'>
					<i class='icon not-italic'>A</i>
					<i class='icon not-italic'>B</i>
					<i class='icon not-italic'>C</i>
				</div>
				<div class='h-screen w-screen flex pr-16 py-16'>
					<div class='w-full p-8 flex flex-col overflow-scroll rounded-2xl dark:bg-stone-800'>
						<h1 class='font-bold text-7xl'>Welcome, {user.name}</h1>
					</div>
				</div>
			</body>
		</html>
	);
};
