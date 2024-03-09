import Layout from '@/shared/layout/layout';
import { Posts } from '@/shared/post/posts';

export default function Page() {
  return (
    <Layout>
      <main>
        <Posts />
      </main>
    </Layout>
  );
}
