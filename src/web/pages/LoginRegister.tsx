import Head from '../components/Head.tsx';
import Outlink from '../components/Outlink.tsx';

export default (visible: 'login' | 'register') => {
	return (
		<html>
			<Head title='Login'>
				<script src='/login/swap.js' />
			</Head>
			<body class='h-full flex flex-center'>
				<div class='w-min rounded-2xl p-8 dark:bg-stone-800'>
					<Outlink>
						<img class='mb-4' src='/favicon.png'></img>
					</Outlink>
					<form class={visible == 'login' ? '' : 'hidden'} id='login' action='/login' method='post'>
						<p class='text-xl mt-4'>Username</p>
						<input name='username' type='text' autofocus class='input-text'></input>
						<p class='text-xl mt-4'>Password</p>
						<input name='password' type='password' class='input-text'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full' type='submit'>Login</button>
							<button class='button basis-full' type='button' onclick='swap();'>
								Register
							</button>
						</div>
					</form>
					<form class={visible == 'register' ? '' : 'hidden'} id='register' action='/register' method='post'>
						<p class='text-xl mt-4'>Username</p>
						<input name='username' type='text' autofocus class='input-text'></input>
						<p class='text-xl mt-4'>Password</p>
						<input name='password' type='password' class='input-text'></input>
						<p class='text-xl mt-4'>Confirm Password</p>
						<input name='password2' type='password' class='input-text'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full' type='button' onclick='swap();'>Login</button>
							<button class='button basis-full' type='submit'>Register</button>
						</div>
					</form>
					<div class='mt-4 text-sm italic text-center'>
						<Outlink />
					</div>
				</div>
			</body>
		</html>
	);
};
