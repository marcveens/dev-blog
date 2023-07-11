'use client';

import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Code: CodeComponent = (props) => {
  const { node, inline, className, children, ...restProps } = props;
  const match = /language-(\w+)/.exec(className || '');

  if (!className) {
    return <code>{children}</code>;
  }

  return !inline && match ? (
    <SyntaxHighlighter {...restProps} children={String(children).replace(/\n$/, '')} style={hybrid} language={match[1]} PreTag="div" />
  ) : (
    <code {...restProps} className={className}>
      {children}
    </code>
  );
};
