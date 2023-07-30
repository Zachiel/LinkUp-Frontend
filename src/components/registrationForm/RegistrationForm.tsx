import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './RegistrationForm.css';

export default function RegistrationForm() {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors, isValid },
		setError,
		clearErrors,
	} = useForm({
		defaultValues: {
			login: '',
			email: '',
			password: '',
			confirmedPassword: '',
		},
		mode: 'onChange',
	});

	const [isFormValid, setFormValid] = useState(false);
	const [isLoginValid, setLoginValid] = useState(false);
	const [isEmailValid, setEmailValid] = useState(false);
	const [isPasswordValid, setPasswordValid] = useState(false);
	const [isConfirmedPasswordValid, setConfirmedPasswordValid] =
		useState(false);

	useEffect(() => {
		setFormValid(isValid);
	}, [isValid]);

	const [serverError, setServerError] = useState<string | null>();

	const submitForm = async (data: any) => {
		try {
			const response = await fetch(
				'https://localhost:7238/api/users/signup',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
			)
				.then((res) => {
					if (res.ok) {
						alert("You're registered!");
						setServerError(null);
					} else {
						return res.json();
					}
				})
				.then((data) => {
					switch (data.code) {
						case 400:
							setServerError(
								`${data.message} [${data.code} Bad request]`,
							);
							break;
						case 401:
							setServerError(
								`${data.message} [${data.code} Unauthorized]`,
							);
							break;
						case 409:
							setServerError(
								`${data.message} [${data.code} Conflict]`,
							);
							break;
					}
				});

			// TODO: handle error handling xD

			// if (!response.ok) {
			// 	switch (response.status) {
			// 		case 400:
			// 			setServerError(`${response.status}: Bad request.`);
			// 			//console.log(serverError);
			// 			break;
			// 		case 401:
			// 			setServerError(`${response.status}: Unauthorized.`);
			// 			//console.log(serverError);
			// 			break;
			// 		case 409:
			// 			setServerError(`${response.status}: Data in use.`);
			// 			//console.log(serverError);
			// 			break;
			// 	}
			// } else {
			// 	//console.log(response.status);
			// 	alert('Thank you for registration!');
			// 	setServerError(null);
			// }
		} catch (err) {
			//setServerError(`${err}`);
		}
	};

	const validatePasswordConfirmation = () => {
		const confirmedPasswordValue = getValues('confirmedPassword');
		const passwordValue = getValues('password');

		if (confirmedPasswordValue !== passwordValue) {
			setError('confirmedPassword', { message: 'Passwords must match.' });
			setConfirmedPasswordValid(false);
		} else {
			clearErrors('confirmedPassword');
			setConfirmedPasswordValid(true);
		}
	};

	return (
		<form
			className='RegistrationForm'
			onSubmit={handleSubmit(submitForm)}>
			{serverError && (
				<p className='errorMessage'>
					Registration failed due to error {serverError}
				</p>
			)}
			<div>
				<label>Username:</label>
				<input
					type='text'
					id='username'
					{...register('login', {
						required: true,
						pattern: /^[a-zA-Z0-9]{1}[\w\d]{2,}$/,
					})}
					onBlur={() => {
						if (!errors.login) {
							setLoginValid(true);
						}
					}}
				/>
				{errors.login && (
					<p className='validationPrompt'>
						Username must be at least 3 characters long.
					</p>
				)}
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					id='email'
					{...register('email', {
						required: true,
						pattern:
							/^[a-zA-Z0-9]+([.\-_]?[a-zA-Z0-9])*@[a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.[a-zA-Z]{2,}$/,
					})}
					onBlur={() => {
						if (!errors.email) {
							setEmailValid(true);
						}
					}}
				/>
				{errors.email && (
					<p className='validationPrompt'>
						Email must be a valid email address.
					</p>
				)}
			</div>
			<div>
				<label>Password:</label>
				<input
					type='password'
					id='password'
					{...register('password', {
						required: true,
						pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
					})}
					onBlur={() => {
						if (!errors.password) {
							setPasswordValid(true);
						}
					}}
				/>
				{errors.password && (
					<p className='validationPrompt'>
						Password must be at least 8 characters long and contain
						at least one uppercase letter, one special character,
						and one digit.
					</p>
				)}
			</div>
			<div>
				<label>Confirm Password:</label>
				<input
					type='password'
					id='confirmedPassword'
					{...register('confirmedPassword', { required: true })}
					onBlur={() => {
						validatePasswordConfirmation();
						if (
							!errors.password &&
							getValues('password') ===
								getValues('confirmedPassword')
						) {
							setConfirmedPasswordValid(true);
						}
					}}
				/>
				{errors.confirmedPassword && (
					<p className='validationPrompt'>Passwords must match.</p>
				)}
			</div>

			<button
				type='submit'
				disabled={!isFormValid}>
				Submit
			</button>
		</form>
	);
}
