import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  const { keyword } = context.params;
  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
