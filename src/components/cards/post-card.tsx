'use client';
import Link from 'next/link';
import Image from 'next/image';
import shorten from '@/utils/shorten';
import Badge from '../ui/badge';

interface PostCardProps {
  title: string;
  image: string;
  category: string;
  content: string
  createdAt: string; // should be a date
  author: User;
  slug: string;
}

function PostCard({
  title,
  image,
  category,
  createdAt,
  slug,
}: PostCardProps) {
  return (
    <li className='w-fit rounded-lg'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='group relative overflow-hidden rounded-md h-full'>
          <Image
            src={image}
            alt={title}
            className='rounded-lg h-auto w-auto object-cover aspect-video group-hover:scale-105 transition-all duration-300'
            width={300}
            height={250}
          />
        </div>
        <div className='flex flex-col gap-4 justify-between max-w-[400px] px-2 py-4 h-full'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center text-sm font-medium'>
              <Badge category={category}>{category}</Badge>
              <p>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <Link
              href={`/post/${slug}`}
              className='w-fit p-2 flex items-center font-medium gap-2 rounded-md hover:underline focus-visible:underline transition-all duration-300'
            >
              <p className='font-bold lg:text-lg'>{shorten(title, 90)}</p>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PostCard;
