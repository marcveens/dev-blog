"use client";

import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import yml from "highlight.js/lib/languages/yaml";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

import "highlight.js/styles/github-dark-dimmed.css";
import { addLineNumbers } from "./syntax-highlight-line-numbers";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("yml", yml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);

// Because it has to run on client, I made it a separate component
export const SyntaxHighlight = () => {
  useEffect(() => {
    hljs.highlightAll();
    addLineNumbers(hljs);
  }, []);

  return null;
};
