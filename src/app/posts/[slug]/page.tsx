import { getPostBySlug } from '@/api/api';
import { format, parseISO } from 'date-fns';
import { slugify } from '@/utils/slugify';
import { Metadata } from 'next';
import { getPageTitle } from '@/utils/getPageTitle';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { mdxComponents } from '@/shared/mdx/mdx-components';
import { SyntaxHighlight } from '@/shared/mdx/syntax-highlight';
import { Comments } from '@/shared/post/comments';
import { Credits } from '@/shared/post/credits';
import Layout from '@/shared/layout/layout';
import { Button } from '@/shared/button/button';
import { LinkButton } from '@/shared/button/link-button';
import { ArrowLeft } from '@/utils/Icons';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: BlogPostProps): Promise<Metadata> {
  const { params } = props;
  const post = getPostBySlug(params.slug);

  return {
    title: getPageTitle(post?.title || ''),
    description: post?.description
  };
}

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const post = getPostBySlug(params.slug);
  const Content = getMDXComponent(post?.body.code || '');

  return (
    <Layout>
      <main className="mx-auto max-w-640">
        <SyntaxHighlight />

        <LinkButton to="/posts" size="small" className="text-contrast/60 hover:shadow-contrast/60" startIcon={<ArrowLeft size={16} />}>
          Back to blog
        </LinkButton>

        <h1 className="mb-12 mt-3 text-center text-4xl font-medium">{post?.title}</h1>

        <div className="post-content mb-12">
          <Content components={mdxComponents} />
        </div>

        <p className="mb-7 mt-6 italic">Published {format(parseISO(post?.date || ''), 'MMM d, yyyy')}</p>

        <div className="mb-12 flex flex-wrap gap-3">
          {post?.tags?.map((tag) => (
            <Button key={tag} to={`/tag/${slugify(tag)}`} size="small" variant="subtle">
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
