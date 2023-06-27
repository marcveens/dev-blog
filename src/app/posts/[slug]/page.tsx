import { getPostBySlug } from '@/api/api';
import { type BlogPost } from '@/types/BlogPost';
import { markdownToHtml } from '@/utils/markdownToHtml';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

const BlogPost = async (props: BlogPostProps) => {
  const { params } = props;
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'description', 'content', 'category', 'tags']);
  const content = await markdownToHtml(post.content || '');

  return <div>{content}</div>;
};

export default BlogPost;
