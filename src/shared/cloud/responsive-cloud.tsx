'use client';
import { useRef } from 'react';
import { useParentSize } from '@cutting/use-get-parent-size';
import { Cloud } from './cloud';

export const ResponsiveCloud = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width = 350 } = useParentSize(ref);
  const height = width * 1.125;

  return (
    <div ref={ref} className="relative mx-auto w-full min-w-0 max-w-[350px] md:w-1/2 lg:min-w-[350px]">
      <Cloud width={width} height={height} className="pointer-events-none absolute left-0 top-0 h-full blur-3xl opacity-60" />
      <Cloud width={width} height={height} className="relative" />
    </div>
  );
};
