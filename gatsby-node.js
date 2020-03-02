const fs = require("fs");
const { pages } = require("./pages");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  pages.forEach(({ path, ...rest }) => {
    createPage({
      path: path,
      component: require.resolve("./src/templates/component.js"),
      context: rest
    });
  });
};
