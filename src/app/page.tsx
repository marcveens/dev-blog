import { Hero } from '@/shared/hero/hero';
import Layout from '@/shared/layout/layout';
import { PostsBlocks } from '@/shared/post/posts-blocks';

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />

        <PostsBlocks />
      </main>
    </Layout>
  );
}
