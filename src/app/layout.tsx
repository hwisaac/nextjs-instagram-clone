import './globals.css';
import 'react-multi-carousel/lib/styles.css';
import Navbar from '@/components/Navbar';
import { Open_Sans } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Instantgram', template: 'Instantgram | %s' },
  description: 'Instantgram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='w-full bg-neutral-50 overflow-auto'>
        <AuthContext>
          <header className='sticky top-0 bg-white z-10 border-b'>
            <div className='mx-auto max-w-screen-xl'>
              <Navbar />
            </div>
          </header>

          <main className='w-full flex justify-center max-w-screen-xl mx-auto'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal' />
      </body>
    </html>
  );
}
