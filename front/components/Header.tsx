import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import AuthServerButton from './auth/AuthServerButton';

const Header = () => {
	return (
		<div className="flex py-4 px-6 border-gray-200">
			<Link href={'/'}>
				<Button variant="outline">Home</Button>
			</Link>
			<Link href={'/pricing'} className="ml-4">
				<Button variant="outline">Price</Button>
			</Link>
			<div className="ml-auto">
				<AuthServerButton />
			</div>
		</div>
	);
};

export default Header;
