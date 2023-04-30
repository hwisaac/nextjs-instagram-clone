'use client';
import Link from 'next/link';
import React from 'react';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import HomeIcon from './ui/icons/HomeIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';

type Props = {};

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search Users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
];

export default function Navbar({}: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='flex justify-between items-center '>
      <Link href='/' aria-label='Home'>
        <h1 className='text-3xl font-bold '>Instagram</h1>
      </Link>
      <nav>
        <ul className='flex gap-4 items-center p-4 px-6'>
          {menu.map(({ href, icon, clickedIcon, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathname === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size='small' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text='Sign out' onClick={() => signOut()} />
            ) : (
              <ColorButton text='Sign in' onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
