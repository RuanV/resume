import { NextResponse } from 'next/server';

// Simple hardcoded access control - in production you'd use a database
const ACCESS_LIST = [
	{ email: 'ruan15viljoen@gmail.com', pin: '1234' },
	{ email: 'admin@example.com', pin: '0000' }
];

export async function POST(request) {
	try {
		const { email, pin } = await request.json();

		if (!email || !pin) {
			return NextResponse.json({ message: 'Email and PIN are required' }, { status: 400 });
		}

		const user = ACCESS_LIST.find(u => u.email === email && u.pin === pin);

		if (!user) {
			return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
		}

		const response = NextResponse.json({ success: true });
		response.cookies.set('resume_access_v1', '1', {
			path: '/',
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		});

		return response;
	} catch (error) {
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}