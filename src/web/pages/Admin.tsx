import { DB } from '../../database/db.ts';
import Head from '../components/Head.tsx';

export default () => {
	return (
		<html>
			<Head title='yaass admin' />
			<body class='p-4'>
				<h1 class='text-7xl'>Admin (WIP)</h1>
				<div class='flex flex-col md:flex-row'>
					<div class='basis-full md:basis-1/2'>
						<h2 class='text-4xl'>Users</h2>
						<div class='dark:bg-stone-800 rounded-2xl p-4 my-2'>
							<strong class='font-bold text-xl mb-2'>New user</strong>
							<form class='grid grid-cols-2 gap-2 text-left' id='new-user' action='/register' method='post'>
								<input name='username' type='text' autofocus class='input-text'></input>
								<p>Username</p>
								<input name='password' type='password' class='input-text'></input>
								<p>Password</p>
								<input name='password2' type='password' class='input-text'></input>
								<p>Confirm Password</p>
								<button class='button basis-full font-bold' type='submit'>Register</button>
							</form>
						</div>
						<div class='dark:bg-stone-800 table-auto p-4 rounded-2xl'>
							<table class='w-full table-auto'>
								<thead>
									<tr>
										<th>Name</th>
										<th>Username</th>
										<th>UID</th>
										<th>Owner?</th>
									</tr>
								</thead>
								<tbody>
									{DB.getUsers().map((user) => (
										<tr>
											<td>{user.name}</td>
											<td>{user.username}</td>
											<td class='font-mono'>{user.uid}</td>
											{user.owner ? <td class='font-bold'>Yes</td> : <td></td>}
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
