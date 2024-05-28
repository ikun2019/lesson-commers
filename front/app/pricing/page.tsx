import React from 'react';
import initStripe, { Stripe } from 'stripe';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Plan {
	id: string;
	name: string;
	price: string | null;
	interval: Stripe.Price.Recurring.Interval | null;
	currency: string;
}

const getAppPlans = async (): Promise<Plan[]> => {
	const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
	const { data: plansList } = await stripe.plans.list();

	const plans = await Promise.all(
		plansList.map(async (plan) => {
			// 商品名の取得
			const product = await stripe.products.retrieve(plan.product as string);
			return {
				id: plan.id,
				name: product.name,
				price: plan.amount_decimal,
				interval: plan.interval,
				currency: plan.currency,
			};
		})
	);
	const sortedPlans = plans.sort((a, b) => parseInt(a.price!) - parseInt(b.price!));

	return sortedPlans;
};

const PricingPage = async () => {
	const plans = await getAppPlans();

	return (
		<div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
			{plans.map((plan) => (
				<Card className="shadow-md" key={plan.id}>
					<CardHeader>
						<CardTitle>{plan.name}プラン</CardTitle>
						<CardDescription>{plan.name}</CardDescription>
					</CardHeader>
					<CardContent>
						{plan.price}円 / {plan.interval}
					</CardContent>
					<CardFooter>
						<Button>サブスクリプション契約する</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default PricingPage;
