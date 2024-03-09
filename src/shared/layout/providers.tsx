'use client';

import { IconContext } from '@phosphor-icons/react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <IconContext.Provider value={{ size: 22, weight: 'light' }}>{children}</IconContext.Provider>;
};
