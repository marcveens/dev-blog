import { getAllPosts } from '@/api/api';
import * as styles from '../../styles/layout.css';
import { slugify } from '@/utils/slugify';
import { notFound } from 'next/navigation';
import { Post } from 'contentlayer/generated';
import { PostPreviewList } from './post-preview-list';

type PostProps = {
  limit?: number;
  offset?: number;
  byFilter?: (post: any) => boolean;
  findPageTitle?: { property: keyof Post; slugifiedValue: string };
};

export const Posts = (props: PostProps) => {
  const { limit = 20, offset = 0, byFilter, findPageTitle } = props;
  let posts = getAllPosts();
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

      <div className="max-w-750 mx-auto flex flex-col gap-11">
        {postsToShow.map((post) => (
          <PostPreviewList
            key={post._id}
            title={post.title}
            description={post.excerpt || post.body.raw}
            slug={post.url}
            category={post.category}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};
