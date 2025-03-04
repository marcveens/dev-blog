import { getAllPosts } from "@/api/api";
import { slugify } from "@/utils/slugify";
import { notFound } from "next/navigation";
import { PostPreviewList } from "./post-preview-list";
import { MdxPage } from "../types/MdxPage";

type PostProps = {
  limit?: number;
  offset?: number;
  byFilter?: (post: MdxPage) => boolean;
  findPageTitle?: { property: keyof MdxPage; slugifiedValue: string };
};

export const Posts = (props: PostProps) => {
  const { limit = 20, offset = 0, byFilter, findPageTitle } = props;
  let posts = getAllPosts();
  posts = posts.filter(byFilter || (() => true));
  const postsToShow = posts.slice(offset, offset + limit);
  let pageTitle: string | undefined = undefined;

  if (byFilter && postsToShow.length === 0) {
    notFound();
  }

  if (byFilter && postsToShow.length > 0 && findPageTitle) {
    const { property, slugifiedValue } = findPageTitle;
    const propertyValue = postsToShow[0][property];

    if (Array.isArray(propertyValue)) {
      const tagIndex = (propertyValue as string[])
        ?.map((t) => slugify(t))
        .indexOf(slugifiedValue);

      pageTitle = `${propertyValue[tagIndex]}`;
    } else {
      pageTitle = `${propertyValue}`;
    }
  }

  return (
    <div>
      <div className="mx-auto flex max-w-[750px] flex-col gap-11">
        {pageTitle && <h1 className="text-4xl font-medium">{pageTitle}</h1>}
        {postsToShow.map((post) => (
          <PostPreviewList
            key={post._id}
            title={post.title}
            description={post.excerpt || post.body}
            slug={post.url}
            category={post.category}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};
