'use client';

import { Code } from '@/shared/Code/Code';
import MarkdownJsx from 'markdown-to-jsx';

export const Markdown = (props: { content: string }) => {
  return (
    <MarkdownJsx
      options={{
        overrides: {
          code: Code,
          img: Img
        }
      }}
    >
      {props.content}
    </MarkdownJsx>
  );
};

const Img = (props: { src: string; alt: string }) => {
  return <img {...props} alt="" className="markdown-img" loading="lazy" />;
};