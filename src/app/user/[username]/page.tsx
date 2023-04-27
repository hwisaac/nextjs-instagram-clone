import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import { Metadata } from 'next';

type Props = { params: { username: string } };

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function page({ params: { username } }: Props) {
  const user = await getUser(username);
  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) • Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}