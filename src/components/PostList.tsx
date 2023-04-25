'use client';
import { SimplePost } from '@/model/post';
import React from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

type Props = {};

export default function PostList({}: Props) {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridLoader color='red' />
        </div>
      )}
      {posts && (
        <ul className=''>
          {posts &&
            posts.map((post) => (
              <li key={post.id} className='mb-4'>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
