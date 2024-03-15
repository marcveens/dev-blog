import { config } from '@/config/config';
import { LinkButton } from '@/shared/button/link-button';
import Layout from '@/shared/layout/layout';
import { Posts } from '@/shared/post/posts';
import { getPageTitle } from '@/utils/getPageTitle';
import { slugify } from '@/utils/slugify';
import { capitalizeFirstLetter } from '@/utils/textUtils';
import { Metadata } from 'next';
import { ArrowLeft } from '@/utils/Icons';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { params } = props;

  return {
    title: getPageTitle(capitalizeFirstLetter(params.category)),
    description: config.subtitle
  };
}

export default function CategoryPage(props: CategoryPageProps) {
  const { params } = props;

  return (
    <Layout>
      <main>
        <LinkButton to="/posts" size="small" className="mb-5 text-contrast/60 hover:shadow-contrast/60" startIcon={<ArrowLeft size={16} />}>
          Back to all posts
        </LinkButton>

        <Posts
          byFilter={(post) => slugify(post.category) === params.category}
          findPageTitle={{ property: 'category', slugifiedValue: params.category }}
        />
      </main>
    </Layout>
  );
}
