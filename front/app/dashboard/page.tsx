import React from 'react';
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/lib/database.types';

const getProfileData = async (supabase: SupabaseClient<Database>) => {
	const { data: profile } = await supabase.from('profile').select('*').single();
	return profile;
};

const Dashboard = async () => {
	const supabase = createServerComponentClient({ cookies });
	const profile = await getProfileData(supabase);

	return (
		<div className="w-full max-w-3xl mx-auto py-16 px-8">
			<h1 className="text-3xl mb-6">ユーザー管理ダッシュボード</h1>
			<div>
				<div>{profile?.is_subscribed ? `プラン契約中: ${profile.interval}` : 'プラン未加入'}</div>
				<button>サブスクリプション管理</button>
			</div>
		</div>
	);
};

export default Dashboard;
