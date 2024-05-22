import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
	const supabase = createServerComponentClient({ cookies });
	const { data: lessons, error } = await supabase.from('lesson').select('*');

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{lessons?.map((lesson: any) => (
				<Link href={`/${lesson.id}`} key={lesson.id}>
					{lesson.title}
				</Link>
			))}
		</main>
	);
}
