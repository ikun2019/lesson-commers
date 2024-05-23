import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

// * コンポーネントのインポート
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Database } from '@/lib/database.types';

// * Supabaseの初期化
const supabase = createServerComponentClient<Database>({ cookies });

// * All Lessonsを取得するメソッド
const getAlllessons = async () => {
	const { data: lessons, error } = await supabase.from('lesson').select('*');
	return lessons;
};

export default async function Home() {
	const lessons = await getAlllessons();

	return (
		<main className="w-full max-w-3xl mx-auto my-16 px-2">
			<div className="flex flex-col gap-3">
				{lessons?.map((lesson: any) => (
					<Link href={`/${lesson.id}`} key={lesson.id}>
						<Card>
							<CardHeader>
								<CardTitle>{lesson.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{lesson.description}</p>
							</CardContent>
							<CardFooter>
								<p>Card Footer</p>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</main>
	);
}
