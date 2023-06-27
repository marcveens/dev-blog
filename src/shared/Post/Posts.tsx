import { getAllPosts } from '@/api/api';
import { PostPreview } from './PostPreview';

type PostProps = {
  limit?: number;
  offset?: number;
};

export const Posts = (props: PostProps) => {
  const { limit = 10, offset = 0 } = props;
  const posts = getAllPosts(['title', 'date', 'slug', 'content', 'category', 'excerpt']);
  const postsToShow = posts.slice(offset, offset + limit);

  return (
    <div>
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
