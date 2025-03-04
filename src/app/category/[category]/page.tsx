import { config } from "@/config/config";
import { LinkButton } from "@/shared/button/link-button";
import { Layout } from "@/shared/layout/layout";
import { Posts } from "@/shared/post/posts";
import { getPageTitle } from "@/utils/getPageTitle";
import { slugify } from "@/utils/slugify";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { Metadata } from "next";
import { ArrowLeft } from "@/utils/Icons";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  return {
    title: getPageTitle(capitalizeFirstLetter(category)),
    description: config.subtitle,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <Layout>
      <main>
        <LinkButton
          to="/posts"
          size="small"
          className="mb-5 text-contrast/60 hover:shadow-contrast/60"
          startIcon={<ArrowLeft size={16} />}
        >
          Back to all posts
        </LinkButton>

        <Posts
          byFilter={(post) => slugify(post.category) === category}
          findPageTitle={{
            property: "category",
            slugifiedValue: category,
          }}
        />
      </main>
    </Layout>
  );
}
