import { Hero } from '@/shared/hero/hero';
import Layout from '@/shared/layout/layout';
import { OpenSourceContributions } from '@/shared/open-source/open-source-contributions';
import { PostsBlocks } from '@/shared/post/posts-blocks';

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />

        <PostsBlocks />

        <OpenSourceContributions />
      </main>
    </Layout>
  );
}
