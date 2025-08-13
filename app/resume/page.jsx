"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';

function AccessForm({ onSuccess }) {
	const [email, setEmail] = useState('');
	const [pin, setPin] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

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
			onSuccess();
		} catch (_) {
			setError('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={submit} className="max-w-sm w-full bg-[#11152c] border border-[#1f223c] rounded p-6 flex flex-col gap-4">
			<h2 className="text-white text-xl font-semibold">Access Resume</h2>
			<input
				type="email"
				required
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="px-4 py-3 rounded bg-[#0d1224] text-white border border-[#1f223c] focus:outline-none"
			/>
			<input
				type="password"
				inputMode="numeric"
				required
				placeholder="PIN"
				value={pin}
				onChange={(e) => setPin(e.target.value)}
				className="px-4 py-3 rounded bg-[#0d1224] text-white border border-[#1f223c] focus:outline-none"
			/>
			{error && <p className="text-pink-400 text-sm">{error}</p>}
			<button disabled={loading} className="bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded px-4 py-3 disabled:opacity-60">
				{loading ? 'Checking...' : 'Unlock'}
			</button>
		</form>
	);
}

export default function ResumePage() {
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// Try a lightweight ping to see if cookie exists by re-posting empty will 401; skip and simply rely on success flow.
	}, []);

	return (
		<div className="py-10 min-h-[70vh] flex flex-col items-center gap-8">
			<div className="text-center">
				<h1 className="text-2xl md:text-3xl font-semibold">Resume</h1>
				<p className="text-gray-300">{personalData.name}</p>
			</div>

			{!authorized ? (
				<AccessForm onSuccess={() => setAuthorized(true)} />
			) : (
				<div className="w-full max-w-3xl">
					{/* If you have a PDF URL, embed it here; else display an image/placeholder */}
					{personalData.resume ? (
						<iframe src={personalData.resume} className="w-full h-[80vh] rounded border border-[#1f223c]" />
					) : (
						<div className="bg-[#11152c] border border-[#1f223c] rounded p-6 text-gray-300">
							<p>No public resume URL configured. Update <code>utils/data/personal-data.js</code> with a PDF link.</p>
						</div>
					)}
					{personalData.resumeDownload && (
						<div className="mt-4 flex justify-end">
							<Link href={personalData.resumeDownload} target="_blank" className="px-4 py-2 rounded bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm">Download</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}


