const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.ignores.add("PLAN.md");

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isodate", function (date) {
    return new Date(date).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("year", function () {
    return String(new Date().getFullYear());
  });

  eleventyConfig.addFilter("groupByTag", function (posts) {
  const groups = {};
  for (const post of posts) {
    const tag = post.data.tag || "Uncategorized";
    if (!groups[tag]) groups[tag] = [];
    groups[tag].push(post);
  }
  return groups;
});

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
