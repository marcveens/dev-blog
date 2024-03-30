import { config } from '@/config/config';
import Layout from '@/shared/layout/layout';
import { Posts } from '@/shared/post/posts';

export const metadata = {
  title: `Blog | ${config.title}`
};

export default function Page() {
  return (
    <Layout>
      <main>
        <Posts />
      </main>
    </Layout>
  );
}
