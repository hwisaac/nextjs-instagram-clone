import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return;

    const bookmarks = user.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((b) => b !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false, // 업데이트할 데이터값은 updateLike의 반환값 말고 optimisticData 로 그대로 업데이트
      revalidate: false,
      rollbackOnError: true, // 로컬에서 캐시를 업댓헀는데, 네트워크 통신에서 문제가 발생하면 원래대로 롤백
    });
  };
  return { user, isLoading, error, setBookmark };
}
