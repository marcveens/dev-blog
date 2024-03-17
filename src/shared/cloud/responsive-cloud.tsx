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
      <!--div className="pointer-events-none absolute -bottom-24 -left-32 -right-32 -top-24 -z-[1] bg-[radial-gradient(rgba(255,159,28,10%)_0%,_#1B1B1D_70%)]" /-->
      <Cloud width={width} height={height} />
    </div>
  );
};
