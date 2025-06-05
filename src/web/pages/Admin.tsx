import { DB } from '../../database/db.ts';
import Head from '../components/Head.tsx';

function getAllUsersAsHtmlChildren() {
	

	
}

export default () => {
	return (
		<html>
			<Head title='Admin' />
			<body>
				<h1 class='text-7xl'>Admin (WIP)</h1>
				<div class='flex flex-col md:flex-row'>
					<div class='basis-full md:basis-1/2'>
						<h2 class='text-4xl'>Users</h2>
						<p class='italic'>No data yet</p>
						{
							DB.getUsers().map((user) => (
								<div class='border border-amber-900 rounded-2xl p-4 my-2'>
									<p class='font-bold'>Name: <span class='font-normal font-mono'>{user.name}</span></p>
									<p class='font-bold'>Username: <span class='font-normal font-mono'>{user.username}</span></p>
									<p class='font-bold'>UID: <span class='font-normal font-mono'>{user.uid}</span></p>
									{user.owner ? <strong class='font-bold'>Is owner!</strong> : ''}
								</div>
							))
						}
					</div>
					<div class='basis-full md:basis-1/2'>
						<h2 class='text-4xl'>Stats</h2>
						<p class='italic'>No data yet</p>
					</div>
				</div>
			</body>
		</html>
	);
};
