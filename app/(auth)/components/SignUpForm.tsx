'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { TbBracketsAngle } from 'react-icons/tb';
import { createUser } from '../actions/authActions';
import { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const session = useSession();
	const ref = useRef<HTMLFormElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (session.status === 'authenticated') {
			toast.success('You are already logged in.');
			router.push('/');
		}
	}, [session.status, router]);

	const handleSubmit = async (formData: FormData) => {
		setIsSubmitting(true);
		const result = await createUser(formData);

		if (result?.existingUser) {
			toast.error(result.existingUser);
		} else {
			toast.success('User created. Please sign-in now!');
			ref.current?.reset();
			router.push('/sign-in');
		}

		setIsSubmitting(false);
	};

	return (
		<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline outline-1 outline-gray-200'>
			<div className='px-4 py-8 sm:rounded-lg sm:px-10'>
				<div className='md:text-4xl sm:text-2xl mb-5 uppercase w-full text-center flex items-center text-white gap-1 justify-center bg-gray-600 py-4 rounded-md'>
					<h1>Join the Dt Squad</h1>
					<TbBracketsAngle />
				</div>

				<form
					ref={ref}
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						handleSubmit(formData);
					}}
					className='space-y-6 mb-3'
				>
					<Input
						type='text'
						label={'Name'}
						id={'name'}
						disabled={isSubmitting}
					/>
					<Input
						type='email'
						label={'Email'}
						id={'email'}
						disabled={isSubmitting}
					/>
					<Input
						type='password'
						label={'Password'}
						id={'password'}
						disabled={isSubmitting}
					/>
					<div className='text-center'>
						<Button type='submit'>Create Account</Button>
					</div>
				</form>
				<Link href={'sign-in'}>
					<span className='hover:underline mt-3 pt-2 text-center flex items-center gap-1  text-gray-500 justify-center hover:text-gray-900 hover:font-semibold hover:transition-all'>
						Already have an account? Sign-in instead &#8594;
					</span>
				</Link>
			</div>
		</div>
	);
};

export default SignUpForm;
