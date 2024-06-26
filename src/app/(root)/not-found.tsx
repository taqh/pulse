import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Notfound() {
  return (
    <section className='min-h-screen grid place-items-center'>
      <div className='flex flex-col gap-4 lg:gap-8 justify-center items-center h-full'>
        <h1 className='text-2xl lg:text-4xl text-center font-bold uppercase'>
          Something went wrong
        </h1>
        <p className='text-center text-lg lg:text-xl max-w-prose text-gray-700'>
          The page you&apos;re looking for has either been removed or
          doesn&apos;t exist.
        </p>
        <Link
          href='/'
          className='mx-auto text-white w-fit p-2 flex items-center justify-center bg-orange-600 hover:bg-orange-600/90 font-semibold rounded-md gap-2 min-w-[8rem]'
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </div>
    </section>
  );
}
