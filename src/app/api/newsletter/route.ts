import { NextResponse } from 'next/server';

import {
  newsletterSchema,
  mapButtondownError,
  NewsletterErrorCode,
} from '@/lib/validations/newsletter';

const RATE_LIMIT = {
  WINDOW: 3600000, // 1 hour in milliseconds
  MAX_REQUESTS: 10,
} as const;

const ipRequests = new Map<string, { count: number; firstRequest: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (!requestData) {
    ipRequests.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - requestData.firstRequest > RATE_LIMIT.WINDOW) {
    ipRequests.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (requestData.count >= RATE_LIMIT.MAX_REQUESTS) {
    return true;
  }

  requestData.count += 1;
  ipRequests.set(ip, requestData);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ code: NewsletterErrorCode.RateLimited }, { status: 429 });
    }

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ code: result.error.issues[0]?.message }, { status: 400 });
    }

    const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;
    if (!BUTTONDOWN_API_KEY) {
      return NextResponse.json({ code: NewsletterErrorCode.ServerError }, { status: 500 });
    }

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: result.data.email,
        type: 'regular',
        metadata: {
          locale: result.data.locale,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Buttondown API error:', {
        status: response.status,
        data,
      });

      return NextResponse.json({ code: mapButtondownError(data) }, { status: response.status });
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ code: NewsletterErrorCode.ServerError }, { status: 500 });
  }
}
