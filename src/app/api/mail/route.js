import { NextResponse } from 'next/server';

const API_URL = 'https://api.mail.tm';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const authHeader = request.headers.get('authorization');

    if (!path) {
        return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: authHeader ? { 'Authorization': authHeader } : {}
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Proxy GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch from mail API' }, { status: 500 });
    }
}

export async function POST(request) {
    const { path, body } = await request.json();
    const authHeader = request.headers.get('authorization');

    if (!path) {
        return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { 'Authorization': authHeader } : {})
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Proxy POST Error:', error);
        return NextResponse.json({ error: 'Failed to post to mail API' }, { status: 500 });
    }
}
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const authHeader = request.headers.get('authorization');

    if (!path) {
        return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'DELETE',
            headers: authHeader ? { 'Authorization': authHeader } : {}
        });

        if (response.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Proxy DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete from mail API' }, { status: 500 });
    }
}
