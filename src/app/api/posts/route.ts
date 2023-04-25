import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions); // 헤더에 있는 토큰을 알아서 해석해서 세션을 받아낸다.
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}
