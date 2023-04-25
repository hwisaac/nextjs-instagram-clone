import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf, getPost } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions); // 헤더에 있는 토큰을 알아서 해석해서 세션을 받아낸다.
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPost(context.params.id) //
    .then((data) => NextResponse.json(data));
}
