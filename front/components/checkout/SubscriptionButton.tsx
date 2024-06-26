'use client';
import React from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';

const SubscriptionButton = ({ planId }: { planId: string }) => {
	const processSubscription = async () => {
		const response = await fetch(`http://localhost:3000/api/subscription/${planId}`);
		const data = await response.json();

		// * クライアント側のstripeの初期化
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
		await stripe?.redirectToCheckout({ sessionId: data.id });
	};

	return <Button onClick={async () => processSubscription()}>サブスクリプション契約</Button>;
};

export default SubscriptionButton;
