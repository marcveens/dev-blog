import { getAllPosts } from '@/api/api';
import { PostPreviewBlock } from './post-preview-block';
import { LinkButton } from '../button/link-button';
import { ArrowRight } from '@/utils/Icons';

export const PostsBlocks = () => {
  let posts = getAllPosts();

  return (
    <div className="mb-5 mt-10">
      <h1 className="mb-3 text-2xl text-contrast/[.5]">Recent posts</h1>
      <div className="mx-auto inline-grid sm:grid-cols-2 gap-8 lg:grid-cols-3 sm:[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex">
        {posts.slice(0, 3).map((post) => (
          <PostPreviewBlock
            key={post._id}
            title={post.title}
            description={post.excerpt || post.body.raw}
            slug={post.url}
            category={post.category}
            date={post.date}
          />
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <LinkButton endIcon={<ArrowRight size={16} />} to="/posts" className="self-center">
          View all posts
        </LinkButton>
      </div>
    </div>
  );
};
