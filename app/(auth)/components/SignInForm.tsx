'use client';

import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { IoShirtSharp } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

const SignInForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		setIsSubmitting(true);
		e.preventDefault();

		const formData = new FormData(formRef.current!);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				throw new Error(result?.error);
			}

			toast.success('Succesfully Signed In');
			router.push('/');
		} catch (error: any) {
			toast.error('Invalid credentials.');
		}
		setIsSubmitting(false);
	};

	return (
		<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline outline-1 outline-gray-200'>
			<div className='px-4 py-8 sm:rounded-lg sm:px-10'>
				<div className='text-2xl mb-5 text-center flex items-center font-semibold text-gray-700 gap-1 justify-center'>
					<h1>Sign in </h1>
					<IoShirtSharp />
				</div>

				<form ref={formRef} onSubmit={handleSubmit} className='space-y-6 mb-3'>
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
						<Button type='submit'>Sign in</Button>
					</div>
				</form>
				<Link href={'sign-up'}>
					<span className='hover:underline mt-3 pt-2 text-center flex items-center gap-1  text-gray-500 justify-center hover:text-gray-900 hover:font-semibold hover:transition-all'>
						Don&apos;t have an account? Create One &#8594;
					</span>
				</Link>
			</div>
		</div>
	);
};

export default SignInForm;
