'use client';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type Props = { post: SimplePost; priority?: boolean; cacheKey?: string };

export default function PostGridCard({
  post,
  priority = false,
  cacheKey = '/api/posts',
}: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };
  return (
    <div className='relative w-full aspect-square'>
      <Image
        onClick={handleOpenPost}
        className='object-cover'
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
      />

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} cacheKey={cacheKey} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
