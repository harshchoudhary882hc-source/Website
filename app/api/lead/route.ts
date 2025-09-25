import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, phone, email, date, time, message } = data || {};

    if (!name || !phone || !email) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[0-9]{10}$/.test(String(phone))) {
      return NextResponse.json({ ok: false, error: 'Invalid phone' }, { status: 400 });
    }

    // Simulate persistence. Replace with DB/CRM webhook as needed.
    console.log('Lead received:', { name, phone, email, date, time, message });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}


