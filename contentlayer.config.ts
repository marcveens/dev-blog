import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: true
    },
    tags: {
      type: 'list',
      of: {
        type: 'string'
      },
      description: 'The tags of the post',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`
    }
  }
}));

export default makeSource({
  contentDirPath: 'src/_posts',
  documentTypes: [Post]
});
