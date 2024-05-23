import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

// * Supabaseの初期化
const supabase = createServerComponentClient<Database>({ cookies });

// * Single Lessonを取得するメソッド
const getDetailLesson = async (id: number) => {
	const { data: lesson, error } = await supabase.from('lesson').select('*').eq('id', id).single();
	return lesson;
};

const LessonDetailPage = async ({ params }: { params: { id: number } }) => {
	const lesson = await getDetailLesson(params.id);
	console.log('LessonDetailPage =>', lesson);

	return (
		<div className="w-full max-3-3xl mx-auto py-16 px-8">
			<h1 className="text-3xl mb-6">{lesson?.title}</h1>
			<p className="mb-8">{lesson?.description}</p>
		</div>
	);
};

export default LessonDetailPage;
