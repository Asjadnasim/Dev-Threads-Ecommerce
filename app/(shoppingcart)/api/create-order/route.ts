import { NextResponse, NextRequest } from 'next/server';
import getCurrentUser from '@/app/(auth)/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import Stripe from 'stripe';
import { CartEntry } from 'use-shopping-cart/core';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2023-10-16',
});

const manageStripePaymentIntent = async (
	payment_intend_id: string,
	total: number
) => {
	if (payment_intend_id) {
		return await stripe.paymentIntents.update(payment_intend_id, {
			amount: total,
		});
	}

	return await stripe.paymentIntents.create({
		amount: total,
		currency: 'usd',
		automatic_payment_methods: { enabled: true },
	});
};

const manageOrderInDb = async (
	paymentIntent: any,
	total: number,
	items: CartEntry[],
	userId: string
) => {
	const existingOrder = await prisma.order.findUnique({
		where: {
			paymentIntentId: paymentIntent.id,
		},
	});

	if (existingOrder) {
		return await prisma.order.update({
			where: {
				paymentIntentId: paymentIntent.id,
			},
			data: {
				userId,
				amount: total,
				currency: 'usd',
				status: 'awaiting payment',
			},
		});
	}

	const createdOrder = await prisma.order.create({
		data: {
			userId,
			amount: total,
			currency: 'usd',
			status: 'awaiting payment',
			paymentIntentId: paymentIntent.id,
		},
	});

	const orderItems = items.map(async (item) => {
		await prisma.orderItem.create({
			data: {
				orderId: createdOrder.id,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
				image: item.image,
				size: item.size,
			},
		});
	});

	await Promise.all(orderItems);
	return createdOrder;
};

export async function POST(req: NextRequest) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ error: 'Not Signed In' }, { status: 403 });
	}

	const userId = user.id;
	const body = await req.json();
	const { items, payment_intend_id, totalAmount } = body;
	const total = totalAmount;

	try {
		const paymentIntent = await manageStripePaymentIntent(
			payment_intend_id,
			total
		);
		const orders = await manageOrderInDb(paymentIntent, total, items, userId);
		return NextResponse.json({
			paymentIntent,
		});
	} catch (error) {
		console.log(error);
	}
}
