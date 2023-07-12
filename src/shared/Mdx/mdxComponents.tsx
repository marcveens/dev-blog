import { MDXComponents } from 'mdx/types';
import { GithubEmbed } from '../GithubEmbed/GithubEmbed';

const Img = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  return <img {...props} alt="" className="markdown-img" loading="lazy" />;
};

const Link = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  const isInternal = props.href?.startsWith('/');
  const target = isInternal ? '_self' : '_blank';
  const rel = isInternal ? '' : 'noopener noreferrer';

  return (
    <a {...props} target={target} rel={rel}>
      {props.children}
    </a>
  );
};

export const mdxComponents: MDXComponents = {
  a: Link,
  img: Img,
  GithubEmbed: GithubEmbed
};
