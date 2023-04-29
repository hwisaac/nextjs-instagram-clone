import { SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false, // 업데이트할 데이터값은 updateLike의 반환값 말고 optimisticData 로 그대로 업데이트
      revalidate: false,
      rollbackOnError: true, // 로컬에서 캐시를 업댓헀는데, 네트워크 통신에서 문제가 발생하면 원래대로 롤백
    });
  };
  return { posts, isLoading, error, setLike };
}
