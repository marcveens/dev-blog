import { getAllPosts, getPostBySlug } from '@/api/api';
import { type BlogPost } from '@/types/BlogPost';
import { markdownToHtml } from '@/utils/markdownToHtml';

export default function BlogPost(props: BlogPost) {
  console.log(props);

  return <div>hello</div>;
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'description', 'content', 'category', 'tags']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}
