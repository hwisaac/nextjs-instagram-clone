import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = { params: { username: string } };

export default async function page({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </>
  );
}
