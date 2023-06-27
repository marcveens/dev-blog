import { getAllPosts, getPostBySlug } from '@/api/api';
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

// export async function getStaticProps({ params }: Params) {
//   const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'description', 'content', 'category', 'tags']);
//   const content = await markdownToHtml(post.content || '');

//   return {
//     props: {
//       post: {
//         ...post,
//         content
//       }
//     }
//   };
// }

// export async function getStaticPaths() {
//   const posts = getAllPosts(['slug']);

//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           slug: post.slug
//         }
//       };
//     }),
//     fallback: false
//   };
// }
