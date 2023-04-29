import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dislikePost, likePost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import {
  addBookmark,
  removeBookmark,
} from '../../../../sanity-studio/schemas/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id, bookmark } = await req.json();
  if (!id || bookmark === undefined) {
    return new Response('Bad request', { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(id, user.id) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}