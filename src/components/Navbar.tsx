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

type Props = {};

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar({}: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className='flex justify-between items-center '>
      <Link href='/'>
        <h1 className='text-3xl font-bold '>Instagram</h1>
      </Link>
      <nav>
        <ul className='flex gap-4 items-center p-4 px-6'>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {session ? (
            <ColorButton
              size='small'
              text='Sign out'
              onClick={() => signOut()}
            />
          ) : (
            <ColorButton size='small' text='Sign in' onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  );
}
