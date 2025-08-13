import { cookies } from 'next/headers';

const COOKIE_NAME = 'resume_access_v1';

export default async function ResumeLayout({ children }) {
	const cookieStore = await cookies();
	const hasAccess = cookieStore.get(COOKIE_NAME)?.value === '1';

	return (
		<section>
			{!hasAccess ? (
				<div className="flex justify-center">{children}</div>
			) : (
				<div className="">{children}</div>
			)}
		</section>
	);
}


