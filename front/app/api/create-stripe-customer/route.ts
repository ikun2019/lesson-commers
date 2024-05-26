import { NextRequest, NextResponse } from 'next/server';
import initStripe from 'stripe';

export async function POST(req: NextRequest) {
	const data = await req.json();
	console.log('STRIPE_API =>', data);
	const { email } = data;

	const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
	const customer = await stripe.customers.create({
		email,
	});

	return NextResponse.json({
		message: `stripe customer created: ${customer.id}`,
	});
}
