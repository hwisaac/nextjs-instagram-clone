'use client';
import React from 'react';
import useSWR from 'swr';

type Props = {};

export default function FollowingBar({}: Props) {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자 정보를 얻어옴
  // 2. 백엔드는 현재 로그인된 사용자의 세션 정보를 이용한다.
  // 3. 백엔드는 사용자 정보를 sanity 에서 가져온다 : followings
  // 4. 클라이언트 컴포넌트에서 followings 정보를 ui에 보여줌 (image, username)

  return <div>FollowingBar</div>;
}
