import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { createPost, getFollowingPostsOf } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions); // 헤더에 있는 토큰을 알아서 해석해서 세션을 받아낸다.
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await req.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file') as Blob;

  if (!text || !file) {
    return new Response('Bad request', { status: 400 });
  }

  return createPost(user.id, text, file) //
    .then((data) => NextResponse.json(data));
} 