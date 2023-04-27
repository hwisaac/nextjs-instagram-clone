import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, context: Context) {
  return searchUsers().then((data) => NextResponse.json(data));
}
