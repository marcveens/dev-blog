'use client';

import { Code } from '@/shared/Code/Code';
import MarkdownJsx from 'markdown-to-jsx';

export const Markdown = (props: { content: string }) => {
  return (
    <MarkdownJsx
      options={{
        overrides: {
          code: Code
        }
      }}
    >
      {props.content}
    </MarkdownJsx>
  );
};
