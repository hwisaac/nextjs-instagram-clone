import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
};

type Props = {};

export default function SearchPage({}: Props) {
  return <UserSearch />;
}
