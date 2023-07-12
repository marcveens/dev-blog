import { getPostBySlug } from '@/api/api';
import { Container } from '@/shared/Container/Container';
import * as styles from './post.css';
import { format, parseISO } from 'date-fns';
import { slugify } from '@/utils/slugify';
import { Metadata } from 'next';
import { getPageTitle } from '@/utils/getPageTitle';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { mdxComponents } from '@/shared/Mdx/mdxComponents';
import { SyntaxHighlight } from '@/shared/Mdx/SyntaxHighlight';

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
    <Container maxWidth="smd">
      <SyntaxHighlight />
      <div className={styles.allPostsButtonBox}>
        <a href="/" className={styles.button}>
          All posts
        </a>
      </div>

      <h1 className={styles.title}>{post?.title}</h1>

      <div className={styles.content}>
        <Content components={mdxComponents} />
      </div>

      <p className={styles.publishedAt}>Published {format(parseISO(post?.date || ''), 'MMM d, yyyy')}</p>

      <div className={styles.tags}>
        {post?.tags?.map((tag) => (
          <a key={tag} className={styles.button} href={`/tag/${slugify(tag)}`}>
            {tag}
          </a>
        ))}
      </div>
    </Container>
  );
}
