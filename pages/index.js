import Link from 'next/link';
import React from 'react';

export default function IndexPage() {
  return (
    <div>
      Hello World.
      {' '}
      <Link href="/about">About</Link>
    </div>
  );
}
