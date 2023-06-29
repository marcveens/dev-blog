import Layout from '@/shared/Layout/layout';
import { Posts } from '@/shared/Post/Posts';
import { slugify } from '@/utils/slugify';

type TagPageProps = {
  params: {
    tag: string;
  };
};

export default function TagPage(props: TagPageProps) {
  const { params } = props;

  return (
    <Layout>
      <main>
        <Posts
          byFilter={(post) => post.tags?.map((t: string) => slugify(t)).includes(params.tag)}
          findPageTitle={{ property: 'tags', slugifiedValue: params.tag }}
        />
      </main>
    </Layout>
  );
}
