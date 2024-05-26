import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

// * Single Lessonを取得するメソッド
const getDetailLesson = async (id: number, supabase: SupabaseClient<Database>) => {
	const { data: lesson, error } = await supabase.from('lesson').select('*').eq('id', id).single();
	return lesson;
};

// * プレミアムコンテンツを取得するメソッド
const getPremiumContent = async (id: number, supabase: SupabaseClient<Database>) => {
	const { data: video } = await supabase
		.from('premium_content')
		.select('video_url')
		.eq('id', id)
		.single();
	console.log(video);

	return video;
};

const LessonDetailPage = async ({ params }: { params: { id: number } }) => {
	// * Supabaseの初期化
	const supabase = createServerComponentClient<Database>({ cookies });
	const lesson = await getDetailLesson(params.id, supabase);
	const video = await getPremiumContent(params.id, supabase);
	console.log('LessonDetailPage =>', lesson);
	console.log('video =>', video);

	return (
		<div className="w-full max-3-3xl mx-auto py-16 px-8">
			<h1 className="text-3xl mb-6">{lesson?.title}</h1>
			<p className="mb-8">{lesson?.description}</p>
		</div>
	);
};

export default LessonDetailPage;
