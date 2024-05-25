import { Hero } from '@/shared/hero/hero';
import Layout from '@/shared/layout/layout';
import { OpenSourceContributions } from '@/shared/open-source/open-source-contributions';
import { PostsBlocks } from '@/shared/post/posts-blocks';
import { SideProjects } from '@/shared/side-projects/side-projects';

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />

        <PostsBlocks />

        <OpenSourceContributions />

        <SideProjects />
      </main>
    </Layout>
  );
}
