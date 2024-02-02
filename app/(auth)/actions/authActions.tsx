'use server';

import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';

export async function createUser(formData: FormData) {
	try {
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const password = formData.get('password') as string;

		try {
			const existingUser = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (existingUser) {
				throw new Error('User already exist. Please sign-in instead!');
			}

			const hashedPassword = await bcrypt.hash(password, 12);

			await prisma.user.create({
				data: {
					email: email,
					name: name,
					hashedPassword: hashedPassword,
				},
			});

			revalidatePath('/');
		} catch (existingUser) {
			return {
				existingUser: 'User already exist. Please sign-in instead',
			};
		}
	} catch (error) {
		console.log(error);
	}
}
