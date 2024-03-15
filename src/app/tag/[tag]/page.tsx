import { config } from '@/config/config';
import { LinkButton } from '@/shared/button/link-button';
import Layout from '@/shared/layout/layout';
import { Posts } from '@/shared/post/posts';
import { getPageTitle } from '@/utils/getPageTitle';
import { slugify } from '@/utils/slugify';
import { capitalizeFirstLetter } from '@/utils/textUtils';
import { Metadata } from 'next';
import { ArrowLeft } from '@/utils/Icons';

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
        <LinkButton to="/posts" size="small" className="mb-5 text-contrast/60 hover:shadow-contrast/60" startIcon={<ArrowLeft size={16} />}>
          Back to all posts
        </LinkButton>

        <Posts
          byFilter={(post) => post.tags?.map((t: string) => slugify(t)).includes(params.tag)}
          findPageTitle={{ property: 'tags', slugifiedValue: params.tag }}
        />
      </main>
    </Layout>
  );
}
