import { ProfileUser } from '@/model/user';
import React from 'react';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  return <div>{user.name}</div>;
}
