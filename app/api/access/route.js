import { NextResponse } from 'next/server';
import { accessConfig } from '@/utils/data/access';

const COOKIE_NAME = 'resume_access_v1';

export async function POST(request) {
	try {
		const { email, pin } = await request.json();

		// Try remote access list first if provided
		const listUrl = process.env.RESUME_ACCESS_LIST_URL;
		let isAllowed = false;
		try {
			if (listUrl) {
				// Support both Drive view link and direct download link
				let url = listUrl;
				const viewMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/);
				if (viewMatch && viewMatch[1]) {
					url = `https://drive.google.com/uc?export=download&id=${viewMatch[1]}`;
				}
				const resp = await fetch(url, { cache: 'no-store' });
				if (resp.ok) {
					const text = await resp.text();
					try {
						const arr = JSON.parse(text);
						const match = arr.find((x) => (x.email || '').toLowerCase() === (email || '').toLowerCase());
						if (match && String(match.pin).trim() === String(pin).trim()) {
							isAllowed = true;
						}
					} catch (_) {
						// ignore JSON parse errors, will fallback below
					}
				}
			}
		} catch (_) {
			// ignore network errors; fallback to local config
		}

		// Fallback to local config if remote did not authorize
		if (!isAllowed) {
			isAllowed =
				email?.trim().toLowerCase() === accessConfig.resume.email.toLowerCase() &&
				String(pin).trim() === String(accessConfig.resume.pin).trim();
		}

		if (!isAllowed) {
			return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
		}

		const res = NextResponse.json({ success: true });
		res.cookies.set(COOKIE_NAME, '1', {
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			path: '/',
			maxAge: 60 * 60, // 1 hour
		});
		return res;
	} catch (e) {
		return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
	}
}

export async function DELETE() {
	const res = NextResponse.json({ success: true });
	res.cookies.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
	return res;
}


