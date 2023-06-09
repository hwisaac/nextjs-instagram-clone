'use client';
import Link from 'next/link';
import React from 'react';
import { PropagateLoader } from 'react-spinners';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hooks/me';

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자 정보를 얻어옴
// 2. 백엔드는 현재 로그인된 사용자의 세션 정보를 이용한다.
// 3. 백엔드는 사용자 정보를 sanity 에서 가져온다 : followings
// 4. 클라이언트 컴포넌트에서 followings 정보를 ui에 보여줌 (image, username)
type Props = {};

export default function FollowingBar({}: Props) {
  const { user, isLoading: loading, error } = useMe();
  const users = user?.following;

  return (
    <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
      {loading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users?.length > 0 && (
        <ScrollableBar>
          {users?.map(({ image, username }) => (
            <Link
              key={username}
              className='flex flex-col items-center w-20'
              href={`/user/${username}`}>
              <Avatar image={image} highlight />{' '}
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
