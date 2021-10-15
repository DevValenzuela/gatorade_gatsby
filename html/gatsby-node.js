/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require("path");
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.createPages = async ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions;
  const {
    createRedirect
  } = actions;
  const tpl = path.resolve(`src/templates/PrincipalPages.js`);
  //   Adjust these field names as needed
  const result = await graphql(`
        {
            paragraphPages: allNodePrincipalPage {
                edges {
                    node {
                        fields {
                            slug
                        }
                        path {
                          alias
                        }
                        drupal_internal__nid
                    }
                }
            }
        }
    `);
  result.data.paragraphPages.edges.forEach(({
    node
  }) => {
    createPage({
      path: node.path.alias == '/home' ? '/' : node.path.alias,
      component: tpl,
      context: {
        slug: node.fields.slug
      }
    });
  });
  const tpll = path.resolve(`src/templates/TermsConditions.js`);
  const resul = await graphql(`{
    articlesTerms: allNodeArticle {
      edges {
        node {
          fields {
            slug
          }
          path {
            alias
          }
          drupal_internal__nid
        }
      }
    }
  }`);
  resul.data.articlesTerms.edges.forEach(({
    node
  }) => {
    createPage({
      path: node.path.alias,
      component: tpll,
      context: {
        slug: node.fields.slug
      }
    });
  });
};

exports.onCreateNode = ({
  node,
  getNode,
  actions
}) => {
  const {
    createNodeField
  } = actions;
  // Use the type of your own paragraph page
  console.log(node.internal.type);
  if (node.internal.type == `node__principal_page`) {
    const slug = `/${node.drupal_internal__nid}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
  if (node.internal.type == `node__article`) {
    const slug = `/${node.drupal_internal__nid}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
/**
  * Implements the onCreatePage node API.
  */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/user/)) {
    page.matchPath = `/user/*`
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/staff/)) {
    page.matchPath = `/staff/*`
    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-qr-reader/,
              use: loaders.null(),
            },
            {
              test: /aos/,
              use: loaders.null(),
            },
            {
              test: /yoga-layout-prebuilt/,
              use: loaders.null(),
            },

          ],
        },
      })
    }
  }
