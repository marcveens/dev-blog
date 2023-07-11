// 'use client';

import { Code } from '@/shared/Code/Code';
import { createElement, Fragment } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "github-embed": { owner: string };
    }
  }
}

// import MarkdownJsx from 'markdown-to-jsx';
// import { GithubEmbed } from '../GithubEmbed/GithubEmbed';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const Markdown = async (props: { content: string }) => {
  // const processedContent = await unified()
  //   .use(remarkParse)
  //   .use(remarkRehype, { allowDangerousHtml: true })
  //   // .use(rehypeParse, { fragment: true })
  //   // .use(rehypeReact, { createElement, Fragment })
  //   .use(rehypeRewrite, {
  //     rewrite: (node, index, parent) => {
  //       console.log(node);

  //       if (node.type === 'element' && node.tagName === 'img') {
  //         node.properties = {
  //           ...node.properties,
  //           className: 'markdown-img',
  //           loading: 'lazy',
  //           alt: ''
  //         };
  //       }
  //     }
  //   })
  //   .use(rehypeStringify, { allowDangerousHtml: true })
  //   .process(props.content);
  // .then((file) => {
  //   console.log(file);
  // });

  // console.log(processedContent);

  return (
    // <MarkdownJsx
    //   options={{
    //     overrides: {
    //       code: Code,
    //       img: Img,
    //       a: Link,
    //       GithubEmbed: GithubEmbed
    //     }
    //   }}
    // >
    //   {props.content}
    // </MarkdownJsx>

    // <>{processedContent.result}</>
    // <div dangerouslySetInnerHTML={{ __html: processedContent.value }} />
    // <>null</>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        a: Link,
        img: Img,
        code: Code,
        'github-embed': (props) => { console.log(props.node); return <div>hello {props.owner}</div> },
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
};

const Img = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  return <img {...props} alt="" className="markdown-img" loading="lazy" />;
};

const Link = (props: { href?: string; children?: React.ReactNode }) => {
  const isInternal = props.href?.startsWith('/');
  const target = isInternal ? '_self' : '_blank';
  const rel = isInternal ? '' : 'noopener noreferrer';

  return (
    <a {...props} target={target} rel={rel}>
      {props.children}
    </a>
  );
};
