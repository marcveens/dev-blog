import Layout from '@/shared/Layout/layout';
import { Posts } from '@/shared/Post/Posts';
import { slugify } from '@/utils/slugify';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default function CategoryPage(props: CategoryPageProps) {
  const { params } = props;

  return (
    <Layout>
      <main>
        <Posts
          byFilter={(post) => slugify(post.category) === params.category}
          findPageTitle={{ property: 'category', slugifiedValue: params.category }}
        />
      </main>
    </Layout>
  );
}
