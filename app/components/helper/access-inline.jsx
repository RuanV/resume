"use client";
import { useEffect, useState } from 'react';

const COOKIE_NAME = 'resume_access_v1';

export default function AccessInline() {
	const [authorized, setAuthorized] = useState(false);
	const [email, setEmail] = useState('');
	const [pin, setPin] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const hasCookie = document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE_NAME}=`));
		setAuthorized(hasCookie);
	}, []);

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await fetch('/api/access', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, pin }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				setError(data?.message || 'Invalid credentials');
				return;
			}
			document.cookie = `${COOKIE_NAME}=1; path=/; SameSite=Lax`;
			setAuthorized(true);
		} catch (_) {
			setError('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	if (authorized) return null;

	return (
		<div className="my-6 flex justify-center">
			<form onSubmit={submit} className="max-w-sm w-full bg-[#11152c] border border-[#1f223c] rounded p-4 flex flex-col gap-3">
				<h3 className="text-white text-base font-semibold">Unlock Site Content</h3>
				<input
					type="email"
					required
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="px-3 py-2 rounded bg-[#0d1224] text-white border border-[#1f223c] focus:outline-none"
				/>
				<input
					type="password"
					inputMode="numeric"
					required
					placeholder="PIN"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					className="px-3 py-2 rounded bg-[#0d1224] text-white border border-[#1f223c] focus:outline-none"
				/>
				{error && <p className="text-pink-400 text-xs">{error}</p>}
				<button disabled={loading} className="bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded px-3 py-2 text-sm disabled:opacity-60">
					{loading ? 'Checking...' : 'Unlock'}
				</button>
			</form>
		</div>
	);
}


