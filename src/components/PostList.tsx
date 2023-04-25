'use client';
import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';

type Props = {};

export default function PostList({}: Props) {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
  );
}
