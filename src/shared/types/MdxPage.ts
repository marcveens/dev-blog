export type MdxPage = {
  /** File path relative to `contentDirPath` */
  _id: string;
  type: "Post";
  slug: string;
  /** The title of the post */
  title: string;
  /** The date of the post */
  date: Date;
  /** The excerpt of the post */
  excerpt?: string | undefined;
  /** The description of the post */
  description: string;
  /** The tags of the post */
  tags?: string[] | undefined;
  /** MDX file body */
  body: string;
  url: string;
};
