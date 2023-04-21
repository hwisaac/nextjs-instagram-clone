import Signin from '@/components/Signin';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { getProviders, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {}; // null 인 경우 {} 가 providers에 저장
  return (
    <section className='flex justify-center mt-24'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
