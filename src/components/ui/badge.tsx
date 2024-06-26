import Link from 'next/link';
import React from 'react';

const categoryColors = {
  Technology: 'bg-blue-500',
  Sports: 'bg-green-500',
  Science: 'bg-purple-500',
  Health: 'bg-red-500',
};

function Badge({ category, children }: { category: string, children: React.ReactNode}) {
  let badgeColor: string;

  switch (category) {
    case 'Technology':
      badgeColor = 'bg-blue-500';
      break;
    case 'Sports':
      badgeColor = 'bg-green-500';
      break;
    case 'Science':
      badgeColor = 'bg-purple-500';
      break;
    case 'Health':
      badgeColor = 'bg-red-500';
      break;
    case 'Business':
      badgeColor = 'bg-fuchsia-500';
      break;
    default:
      badgeColor = 'bg-gray-500';
  }

  return (
    <Link href={`/?cat=${category.toLowerCase()}`} className={`text-white rounded-md py-1 px-2 ${badgeColor}`}>
      {children}
    </Link>
  );
}

export default Badge;
