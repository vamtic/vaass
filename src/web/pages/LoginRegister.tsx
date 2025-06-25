import Head from '../components/Head.tsx';
import Outlink from '../components/Outlink.tsx';
import type { PropsWithChildren } from 'hono/jsx';

const Error = (text: string) => (
	<div class='text-center'>
		<span class='text-red-500 font-bold'>{text}</span>
	</div>
);

export default ({ mode, page, error }: PropsWithChildren<{ mode: 'login' | 'register'; page?: 'dashboard' | 'admin'; error?: string }>) => {
	return (
		<html>
			<Head title={mode == 'login' ? 'Bejelentkezés' : 'Regisztráció'}>
				<script src='/login/swap.js' />
			</Head>
			<body class='h-full flex flex-center'>
				<div class='login-container'>
					<Outlink>
						<img class='mb-4 mx-auto' src='/favicon.png' />
					</Outlink>

					{/* Hibaüzenet megjelenítése, ha van */}
					{error != null ? Error(`${error}`) : ''}

					{/* Bejelentkezési űrlap */}
					<form class={mode == 'login' ? '' : 'hidden'} id='login' action={`/login?page=${page ?? 'dashboard'}`} method='post'>
						<div class='form-row'>
							<p class='text-xl'>Felhasználónév</p>
							<input name='username' type='text' autofocus class='input-text'></input>
						</div>
						<div class='form-row'>
							<p class='text-xl mt-4'>Jelszó</p>
							<input name='password' type='password' class='input-text'></input>
						</div>
						<div class='button-group'>
							<button class='button basis-full font-bold' type='submit'>Bejelentkezés</button>
							<button class='button basis-full' type='button' onclick='swap();'>
								Regisztráció
							</button>
						</div>
					</form>

					{/* Regisztrációs űrlap */}
					<form class={mode == 'register' ? '' : 'hidden'} id='register' action='/register' method='post'>
						<div class='form-row'>
							<p class='text-xl'>Felhasználónév</p>
							<input name='username' type='text' autofocus class='input-text'></input>
						</div>
						<div class='form-row'>
							<p class='text-xl mt-4'>Jelszó</p>
							<input name='password' type='password' class='input-text'></input>
						</div>
						<div class='form-row'>
							<p class='text-xl mt-4'>Jelszó megerősítése</p>
							<input name='password2' type='password' class='input-text'></input>
						</div>
						<div class='button-group'>
							<button class='button basis-full' type='button' onclick='swap();'>Bejelentkezés</button>
							<button class='button basis-full font-bold' type='submit'>Regisztráció</button>
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