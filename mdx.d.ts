declare module '*.mdx' {
  interface Meta {
    title: string;
    date: string;
    description: string;
    excerpt?: string;
    category: string;
    tags?: string[];
  }

  export const meta: Meta;
}
