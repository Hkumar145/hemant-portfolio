'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const RocketLoader = dynamic(() => import('@/components/RocketLoader'), { ssr: false });

export default function InitialSplash({
  minDuration = 1500,       // how long to idle before liftoff starts
  oncePerSession = true,
  message = 'Launching portfolio…',
  liftoffMs = 900,          // keep in sync with RocketLoader
  overlapMs = 320,          // when to begin fading after liftoff starts
}: {
  minDuration?: number;
  oncePerSession?: boolean;
  message?: string;
  liftoffMs?: number;
  overlapMs?: number;
}) {
  const [mount, setMount] = useState(true);
  const [fade, setFade] = useState(false);
  const [launch, setLaunch] = useState(false);

  const tIdle = useRef<number | null>(null);
  const tFade = useRef<number | null>(null);
  const tUnmount = useRef<number | null>(null);

  useEffect(() => {
    if (oncePerSession && typeof window !== 'undefined' && sessionStorage.getItem('splash-seen') === '1') {
      setMount(false);
      return;
    }

    // 1) idle, then trigger liftoff
    tIdle.current = window.setTimeout(() => {
      setLaunch(true);

      // 2) begin fade partway through liftoff
      tFade.current = window.setTimeout(() => setFade(true), Math.max(0, overlapMs));

      // 3) unmount after liftoff finishes + a short buffer
      tUnmount.current = window.setTimeout(() => {
        setMount(false);
        if (oncePerSession) sessionStorage.setItem('splash-seen', '1');
      }, liftoffMs + 120);
    }, minDuration);

    return () => {
      if (tIdle.current) clearTimeout(tIdle.current);
      if (tFade.current) clearTimeout(tFade.current);
      if (tUnmount.current) clearTimeout(tUnmount.current);
    };
  }, [minDuration, oncePerSession, liftoffMs, overlapMs]);

  if (!mount) return null;

  return (
    <div className={`fixed inset-0 z-[1100] transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <RocketLoader message={message} launch={launch} liftoffMs={liftoffMs} />
    </div>
  );
}
