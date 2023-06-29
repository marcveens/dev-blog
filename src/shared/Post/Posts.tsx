import { getAllPosts } from '@/api/api';
import { PostPreview } from './PostPreview';
import * as styles from '../../styles/layout.css';
import { slugify } from '@/utils/slugify';
import { notFound } from 'next/navigation';

type PostProps = {
  limit?: number;
  offset?: number;
  byFilter?: (post: any) => boolean;
  findPageTitle?: { property: string; slugifiedValue: string };
};

export const Posts = (props: PostProps) => {
  const { limit = 20, offset = 0, byFilter, findPageTitle } = props;
  let posts = getAllPosts(['title', 'date', 'slug', 'content', 'category', 'excerpt', 'tags']);
  posts = posts.filter(byFilter || (() => true));
  const postsToShow = posts.slice(offset, offset + limit);
  let pageTitle: string | undefined = undefined;

  if (byFilter && postsToShow.length === 0) {
    notFound();
  }

  if (byFilter && postsToShow.length > 0 && findPageTitle) {
    const { property, slugifiedValue } = findPageTitle;
    const propertyValue = postsToShow[0][property];

    if (Array.isArray(propertyValue)) {
      const tagIndex = (propertyValue as string[])?.map((t) => slugify(t)).indexOf(slugifiedValue);

      pageTitle = `${propertyValue[tagIndex]}`;
    } else {
      pageTitle = `${propertyValue}`;
    }
  }

  return (
    <div>
      {pageTitle && <h1 className={styles.pageTitle}>{pageTitle}</h1>}

      {postsToShow.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          description={post.excerpt || post.content}
          slug={post.slug}
          category={post.category}
          date={post.date}
        />
      ))}
    </div>
  );
};
