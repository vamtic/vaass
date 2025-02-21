import { WEBSITE, WHO_AM_I } from '../../utils.ts';
import { StylesLink } from './Styles.tsx';
import type { Upload } from '../../types/Upload.ts';

export default () => {
	return (
		<html>
			<head>
				<title>Login</title>
				<StylesLink />
			</head>
			<body class='h-full flex flex-col flex-center'>
				<div class='w-min rounded-2xl p-8 dark:bg-slate-800'>
					<h1 class='text-2xl font-bold'>Login</h1>
					<form method='post'>
						<p class='text-xl mt-4'>Username</p>
						<input type='text' autofocus class='p-0.5 border rounded border-slate-500'></input>
						<p class='text-xl mt-4'>Password</p>
						<input type='password' class='p-0.5 border rounded border-slate-500'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full' type='submit'>Login</button>
							<button class='button basis-full'>Register</button>
						</div>
					</form>
				</div>
			</body>
		</html>
	);
};
