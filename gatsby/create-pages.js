'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Redirects for old URL structure
  createRedirect({ fromPath: '/ssr-website-service-worker-caching-strategy', toPath: '/posts/ssr-website-service-worker-caching-strategy', isPermanent: true });
  createRedirect({ fromPath: '/netlify-cms-generate-config-yml', toPath: '/posts/netlify-cms-generate-config-yml', isPermanent: true });
  createRedirect({ fromPath: '/netlify-cms-dynamic-select-widget-values', toPath: '/posts/netlify-cms-dynamic-select-widget-values', isPermanent: true });
  createRedirect({ fromPath: '/simple-typescript-api-caching-layer', toPath: '/posts/simple-typescript-api-caching-layer', isPermanent: true });
  createRedirect({ fromPath: '/use-immer-for-state-manipulation', toPath: '/posts/use-immer-for-state-manipulation', isPermanent: true });
  createRedirect({ fromPath: '/testing-your-react-components-with-jest', toPath: '/posts/testing-your-react-components-with-jest', isPermanent: true });
  createRedirect({ fromPath: '/run-e2e-js-tests-in-azure-devops', toPath: '/posts/run-e2e-js-tests-in-azure-devops', isPermanent: true });
  createRedirect({ fromPath: '/react-context-mutex', toPath: '/posts/react-context-mutex', isPermanent: true });
  createRedirect({ fromPath: '/react-redux-toolkit-starter', toPath: '/posts/react-redux-toolkit-starter', isPermanent: true });

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js')
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js')
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
            excerpt(pruneLength: 250)
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  _.each(edges, (edge) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
