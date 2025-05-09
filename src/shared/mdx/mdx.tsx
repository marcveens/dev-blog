import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { GithubEmbed } from "../github-embed/github-embed";
import {
  Button,
  CodesandboxButton,
  DemoButton,
  GithubButton,
  GithubCodeSpaceButton,
} from "../button/button";
import { Hint } from "../mdx/hint";
import { CdnVideo } from "../video/cdn-video";

const Img = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  return <img {...props} alt="" className="markdown-img" loading="lazy" />;
};

const Link = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const isInternal = props.href?.startsWith("/");
  const target = isInternal ? "_self" : "_blank";
  const rel = isInternal ? "" : "noopener noreferrer";

  return (
    <a {...props} target={target} rel={rel}>
      {props.children}
    </a>
  );
};

export const CustomMdx = (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      components={{
        a: Link,
        img: Img,
        GithubEmbed: GithubEmbed,
        Button: Button,
        GithubButton: GithubButton,
        GithubCodeSpaceButton: GithubCodeSpaceButton,
        CodesandboxButton: CodesandboxButton,
        DemoButton: DemoButton,
        Hint: Hint,
        CdnVideo: CdnVideo,

        ...props.components,
      }}
    />
  );
};
