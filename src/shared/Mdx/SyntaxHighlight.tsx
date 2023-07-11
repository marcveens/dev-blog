'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import yml from 'highlight.js/lib/languages/yaml';

import 'highlight.js/styles/github-dark-dimmed.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yml', yml);

// Because it has to run on client, I made it a separate component
export const SyntaxHighlight = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
};
