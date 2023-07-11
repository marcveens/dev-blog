'use client';

import hljs from 'highlight.js/lib/core';
import { useEffect } from 'react';

export const Code = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const { className, children } = props;
  const match = /language-(\w+)/.exec(className || '');

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  if (!className) {
    return <code>{children}</code>;
  }

  return match ? <code className={className}>{children}</code> : <code className={className}>{children}</code>;
};
