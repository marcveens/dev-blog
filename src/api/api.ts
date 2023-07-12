import fs from 'fs';
import { join } from 'path';
import { allPosts } from 'contentlayer/generated';

const postsDirectory = join(process.cwd(), 'src/_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const post = allPosts.find((post) => post._id.replace(/\.mdx$/, '') === slug);

  return post;
}

export function getAllPosts() {
  const posts = allPosts
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
