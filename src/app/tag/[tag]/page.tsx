import { config } from "@/config/config";
import { LinkButton } from "@/shared/button/link-button";
import { Layout } from "@/shared/layout/layout";
import { Posts } from "@/shared/post/posts";
import { getPageTitle } from "@/utils/getPageTitle";
import { slugify } from "@/utils/slugify";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { Metadata } from "next";
import { ArrowLeft } from "@/utils/Icons";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: getPageTitle(capitalizeFirstLetter(tag)),
    description: config.subtitle,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;

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
          byFilter={(post) =>
            post.tags?.map((t: string) => slugify(t)).includes(tag) || false
          }
          findPageTitle={{ property: "tags", slugifiedValue: tag }}
        />
      </main>
    </Layout>
  );
}
