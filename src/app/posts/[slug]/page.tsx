import { getPostBySlug, getAllPosts } from "@/api/api";
import { format } from "date-fns";
import { slugify } from "@/utils/slugify";
import { Metadata } from "next";
import { getPageTitle } from "@/utils/getPageTitle";
import { SyntaxHighlight } from "@/shared/mdx/syntax-highlight";
import { Comments } from "@/shared/post/comments";
import { Credits } from "@/shared/post/credits";
import { Layout } from "@/shared/layout/layout";
import { Button } from "@/shared/button/button";
import { LinkButton } from "@/shared/button/link-button";
import { ArrowLeft } from "@/utils/Icons";
import { notFound } from "next/navigation";
import { CustomMdx } from "@/shared/mdx/mdx";

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: getPageTitle(post?.title || ""),
    description: post?.description,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  // const { default: Post } = await import(`@/_posts/${slug}.mdx`);
  // const Content = getMDXComponent(post?.body.code || '');

  if (!post) {
    return notFound();
  }

  return (
    <Layout>
      <main className="mx-auto max-w-[640px]">
        <SyntaxHighlight />

        <LinkButton
          to="/posts"
          size="small"
          className="text-contrast/60 hover:shadow-contrast/60"
          startIcon={<ArrowLeft size={16} />}
        >
          Back to blog
        </LinkButton>

        <h1 className="mb-12 mt-3 text-center text-4xl font-medium">
          {post?.title}
        </h1>

        <div className="post-content mb-12">
          <CustomMdx source={post.body} />
        </div>

        <p className="mb-7 mt-6 italic">
          Published {format(post?.date || "", "MMM d, yyyy")}
        </p>

        <div className="mb-12 flex flex-wrap gap-3">
          {post?.tags?.map((tag) => (
            <Button
              key={tag}
              to={`/tag/${slugify(tag)}`}
              size="small"
              variant="subtle"
            >
              {tag}
            </Button>
          ))}
        </div>

        <Credits />

        <Comments />
      </main>
    </Layout>
  );
}
