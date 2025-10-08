'use client';

import dynamic from 'next/dynamic';
const RocketLoader = dynamic(() => import('@/components/RocketLoader'), { ssr: false });

export default function Loading() {
  return <RocketLoader message="Launching portfolio…" />;
}
