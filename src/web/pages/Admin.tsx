import { DB } from '../../database/db.ts';
import Head from '../components/Head.tsx';

export default () => {
	return (
		<html>
			<Head title='yaass admin' />
			<body class='p-4'>
				<h1 class='text-5xl mb-2'>Admin felület (Folyamatban)</h1>
				<div class='flex flex-col md:flex-row gap-4'>
					<div class='basis-full md:basis-1/2'>
						<div class='dark:bg-stone-800 rounded-2xl p-4 my-4'>
							<strong class='font-bold text-xl mb-2'>Új felhasználó</strong>
							<form class='grid grid-cols-2 gap-2 text-left' id='new-user' action='/register' method='post'>
								<input name='username' type='text' autofocus class='input-text'></input>
								<p>Felhasználónév</p>
								<input name='password' type='password' class='input-text'></input>
								<p>Jelszó</p>
								<input name='password2' type='password' class='input-text'></input>
								<p>Jelszó megerősítése</p>
								<button class='button basis-full font-bold' type='submit'>Regisztráció</button>
							</form>
						</div>
						<table class='dark:bg-stone-800 w-full table-auto border-collapse border border-stone-700'>
							<thead>
								<tr>
									<th class='p-2 border border-stone-700'>ID</th>
									<th class='p-2 border border-stone-700'>Név</th>
									<th class='p-2 border border-stone-700'>Felhasználónév</th>
									<th class='p-2 border border-stone-700'>UID</th>
								</tr>
							</thead>
							<tbody>
								{DB.getUsers().map((user) => (
									<tr>
										<td class='font-mono font-bold p-2 border border-stone-700'>{user._id}</td>
										<td class={`p-2 border border-stone-700 ${user.owner ? 'font-bold italic' : ''}`}>{user.name}</td>
										<td class='p-2 border border-stone-700'>{user.username}</td>
										<td class='font-mono p-2 border border-stone-700'>{user.uid}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div class='basis-full md:basis-1/2'>
						<h2 class='text-4xl'>Statisztikák</h2>
						<p class='italic'>Még nincs adat</p>
					</div>
				</div>
			</body>
		</html>
	);
};