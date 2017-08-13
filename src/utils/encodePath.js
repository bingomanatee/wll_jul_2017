
const ensureArticles = (path) => {
  if (!/^articles\//.test(path)) return `articles/${path}`;
  return path;
}

export default(path) => encodeURIComponent(ensureArticles(path)).replace(/\./g, '%2E')