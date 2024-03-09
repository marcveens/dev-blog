import Layout from '@/shared/layout/layout';
import { Posts } from '@/shared/post/posts';

export default function Home() {
  return (
    <Layout>
      <main>
        <Posts />
      </main>
    </Layout>
  );
}
