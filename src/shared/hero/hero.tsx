'use client';

import { config } from "@/config/config";
import { OmbreHorizon7 } from '@ombre-ui/react'
import { ResponsiveCloud } from "../cloud/responsive-cloud";

export const Hero = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-[600px] md:h-[500px] opacity-80 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] z-[-1]">
        <OmbreHorizon7 backgroundColor="#1b1b1d" />
      </div>
      <section className="flex flex-col md:flex-row md:items-center">
        <div className="mb-5 text-center md:mb-0 md:max-w-[50%] md:text-left lg:grow lg:max-w-none">
          <h1 className="md:text-[32px]/[1] lg:text-[50px]/[1] text-2xl font-medium sm:text-3xl">
            {config.hero}
          </h1>
        </div>
        <ResponsiveCloud />
      </section>
    </div>
  );
};
