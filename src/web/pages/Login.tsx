import Head from '../components/Head.tsx';
import Outlink from '../components/Outlink.tsx';

export default () => {
	return (
		<html>
			<Head title='Login' />
			<body class='h-full flex flex-center'>
				<div class='w-min rounded-2xl p-8 dark:bg-stone-800'>
					<Outlink>
						<img src='/favicon.png'></img>
					</Outlink>
					<form method='post'>
						<p class='text-xl mt-8'>Username</p>
						<input type='text' autofocus class='p-0.5 border rounded border-rose-500'></input>
						<p class='text-xl mt-4'>Password</p>
						<input type='password' class='p-0.5 border rounded border-rose-500'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full' type='submit'>Login</button>
							<button class='button basis-full'>Register</button>
						</div>
						<div class='mt-4 text-sm italic text-center'>
							<Outlink />
						</div>
					</form>
				</div>
			</body>
		</html>
	);
};
