'use client';
import React from 'react';
import PostListCard from './PostListCard';
import GridSpinner from './GridSpinner';
import usePosts from '@/hooks/posts';

type Props = {};

export default function PostList({}: Props) {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridSpinner color='red' />
        </div>
      )}
      {posts && (
        <ul className=''>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id} className='mb-4'>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
