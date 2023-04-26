'use client';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from '@/components/GridSpinner';
import { SearchUser } from '@/model/user';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';
/**
 * 1. /api/search/${keyword} 에 키워드 검색어 요청
 * 2. 검색하는 keyword 가 있다면 /api/search/bob -> 유저네임이나, 네임 리턴
 * 3. 검색하는 키워드가 없다면 /api/search -> 전체
 */

type Props = {};

export default function UserSearch({}: Props) {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className='w-full max-w-2xl my-4 flex flex-col items-center'>
      <form className='w-full mb-4' onSubmit={onSubmit}>
        <input
          className='w-full text-xl p-3 outline-none border border-gray-400'
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>무언가가 잘못 됐다! 🤪</p>}
      {isLoading && <GridSpinner />}
      {!error && !isLoading && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul className='w-full p-4'>
        {users &&
          users?.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
