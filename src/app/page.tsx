import Layout from '@/shared/Layout/layout';
import { Posts } from '@/shared/Post/Posts';

export default function Home() {
  return (
    <Layout>
      <main>
        <Posts />
      </main>
    </Layout>
  );
}
