'use client';

import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const SubscriptionManagementButton = () => {
	const router = useRouter();

	const loadPortal = async () => {
		const response = await fetch('http://localhost:3000/api/portal');
		const data = await response.json();
		router.push(data.url);
	};

	return <Button onClick={loadPortal}>サブスクリプションを管理</Button>;
};

export default SubscriptionManagementButton;
