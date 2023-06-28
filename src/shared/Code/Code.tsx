'use client'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';


type CodeProps = {
  children: string;
  className?: string;
};

export const Code = (props: CodeProps) => {
  const { children, className } = props;

  if (!className) {
    return <code>{children}</code>;
  }

  return <SyntaxHighlighter language='typescript' style={hybrid}>{children}</SyntaxHighlighter>;
};
