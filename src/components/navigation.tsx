'use client';
import MaxWidthContainer from '@/components/max-width-container';
import { AudioWaveform, MessageCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();

  return (
    <header className='hidden md:block sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all'>
      <MaxWidthContainer className='flex items-center justify-between'>
        <Link
          href='/'
          className='font-semibold lg:text-lg flex items-center gap-2'
        >
          <AudioWaveform className='text-orange-600' />
          <p>Pulse</p>
        </Link>
        <nav>
          <ul
            className={`flex min-w-full gap-6 text-lg font-medium transition duration-300 `}
          >
            <li className='relative'>
              <Link
                href='/search'
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-2 transition duration-300 hover:bg-orange-100 focus-visible:outline-dashed ${
                  pathname === '/search'
                    ? 'bg-orange-100 text-orange-500'
                    : 'bg-transparent'
                }`}
              >
                Search <Search size={16} className='text-orange-500'/>
              </Link>
            </li>
            <li className='relative'>
              <Link
                href='/contact'
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-2 transition duration-300 hover:bg-orange-100 focus-visible:outline-dashed ${
                  pathname === '/search'
                    ? 'bg-orange-100 text-orange-500'
                    : 'bg-transparent'
                }`}
              >
                Contact <MessageCircle size={16} className='text-orange-500'/>
              </Link>
            </li>

          </ul>
        </nav>
      </MaxWidthContainer>
    </header>
  );
}

export default Navigation;
