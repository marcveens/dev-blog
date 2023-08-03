import { getAllPosts } from '@/api/api';
import { config } from '@/config/config';
import RSS from 'rss';

export async function GET() {
  const posts = getAllPosts();
  const postsToRender = posts.slice(0, 10);

  const feed = new RSS({
    title: config.title,
    description: '',
    site_url: config.siteUrl,
    feed_url: config.siteUrl + '/feed.xml',
    copyright: config.author,
    language: 'en-GB',
    pubDate: ''
  });

  postsToRender.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${config.siteUrl}${post.url}`,
      date: post.date
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    }
  });
}
