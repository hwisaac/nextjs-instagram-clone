'use client';
import { ProfileUser } from '@/model/user';
import React, { useState } from 'react';
import useSWR from 'swr';

type Props = { user: ProfileUser };

// /api/users/${username}/posts
// /api/users/${username}/liked
// /api/users/${username}/bookmarks -> api/users/[...slug]
export default function UserPosts({ user: { username } }: Props) {
  const [tab, setTab] = useState('posts');
  const { data: posts } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);
  return <div>UserPosts</div>;
}
