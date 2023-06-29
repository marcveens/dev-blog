import { config } from '@/config/config';
import Layout from '@/shared/Layout/layout';
import { Posts } from '@/shared/Post/Posts';
import { getPageTitle } from '@/utils/getPageTitle';
import { slugify } from '@/utils/slugify';
import { capitalizeFirstLetter } from '@/utils/textUtils';
import { Metadata } from 'next';

type TagPageProps = {
  params: {
    tag: string;
  };
};

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
  const { params } = props;

  return {
    title: getPageTitle(capitalizeFirstLetter(params.tag)),
    description: config.subtitle
  };
}

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
