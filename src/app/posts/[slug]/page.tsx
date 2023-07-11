import { getPostBySlug } from '@/api/api';
import { Container } from '@/shared/Container/Container';
import { type BlogPost } from '@/types/BlogPost';
import * as styles from './post.css';
import { format, parseISO } from 'date-fns';
import { slugify } from '@/utils/slugify';
import { Markdown } from '@/shared/Markdown/Markdown';
import { Metadata } from 'next';
import { getPageTitle } from '@/utils/getPageTitle';
import { Octokit } from '@octokit/core';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: BlogPostProps): Promise<Metadata> {
  const { params } = props;
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'description', 'content', 'category', 'tags']);

  return {
    title: getPageTitle(post.title),
    description: post.description,
  }
}

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'description', 'content', 'category', 'tags']);
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'marcveens',
    repo: 'multiple-graphql-endpoints',
    path: `src/apollo/useApolloClient.ts`,
    mediaType: {
      format: 'raw'
    }
  });

  // console.log(data);

  return (
    <Container maxWidth="smd">
      <div className={styles.allPostsButtonBox}>
        <a href="/" className={styles.button}>
          All posts
        </a>
      </div>

      <h1 className={styles.title}>{post.title}</h1>

      <div className={styles.content}>
        <Markdown content={post.content} />
      </div>

      <p className={styles.publishedAt}>Published {format(parseISO(post.date), 'MMM d, yyyy')}</p>

      <div className={styles.tags}>
        {(post.tags as unknown as string[] || []).map((tag) => (
          <a key={tag} className={styles.button} href={`/tag/${slugify(tag)}`}>
            {tag}
          </a>
        ))}
      </div>
    </Container>
  );
};
