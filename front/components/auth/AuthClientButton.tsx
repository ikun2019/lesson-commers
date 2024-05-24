'use client';

import React from 'react';
import { Session } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

const AuthClientButton = ({ session }: { session: Session | null }) => {
	const router = useRouter();
	const supabase = createClientComponentClient();

	// * Loginメソッド
	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
	};

	// * Logoutメソッド
	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return (
		<>
			{session ? (
				<Button onClick={handleLogout}>Logout</Button>
			) : (
				<Button onClick={handleLogin}>Login</Button>
			)}
		</>
	);
};

export default AuthClientButton;
