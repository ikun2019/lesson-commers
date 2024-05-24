'use client';

import React from 'react';
import { Session } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Button } from '../ui/button';

const AuthClientButton = ({ session }: { session: Session | null }) => {
	const supabase = createClientComponentClient();

	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
		});
	};

	return <Button onClick={handleLogin}>Login</Button>;
};

export default AuthClientButton;
