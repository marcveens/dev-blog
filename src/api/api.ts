import fs from "fs";
import { join } from "path";
import { OpenSourceBlockProps } from "@/shared/open-source/open-source-block";
import { config } from "@/config/config";
import matter from "gray-matter";
import { MdxPage } from "@/shared/types/MdxPage";
import { parseISO } from "date-fns";

const postsDirectory = join(process.cwd(), "src/_posts");

const allPosts = (): MdxPage[] => {
  return fs.readdirSync(postsDirectory).map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fileContents = fs.readFileSync(
      join(postsDirectory, filename),
      "utf8"
    );
    const { data, content } = matter(fileContents);

    return {
      _id: slug,
      slug,
      body: content,
      date: parseISO(data.date),
      description: data.description,
      excerpt: data.excerpt,
      tags: data.tags,
      title: data.title,
      url: `/posts/${slug}`,
      type: "Post",
    } satisfies MdxPage;
  });
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const post = allPosts().find(
    (post) => post._id.replace(/\.mdx$/, "") === slug
  );

  return post;
}

export function getAllPosts() {
  const posts = allPosts()
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export async function getOpenSourceProjects(): Promise<OpenSourceBlockProps[]> {
  const projects = config.openSourceProjects;
  const props: OpenSourceBlockProps[] = [];
  const dayInSeconds = 60 * 60 * 24;

  for (const project of projects) {
    const downloadsResponse = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${project.name}`,
      {
        next: { revalidate: dayInSeconds },
      }
    );
    const downloads = (await downloadsResponse.json()).downloads;

    const starsResponse = await fetch(
      `https://api.github.com/repos/${project.githubAccount}/${project.name}`,
      {
        next: { revalidate: dayInSeconds },
      }
    );
    const stars = (await starsResponse.json()).stargazers_count;

    const npmResponse = await fetch(
      `https://registry.npmjs.org/${project.name}/latest`,
      { next: { revalidate: dayInSeconds } }
    );
    const npm = await npmResponse.json();
    const version = npm.version;
    const description = npm.description;

    props.push({
      title: project.name,
      description,
      downloads,
      stars,
      link: `https://github.com/${project.githubAccount}/${project.name}`,
      version,
    });
  }

  return props;
}
