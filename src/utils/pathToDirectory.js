export default (path) => {
  let dirName = path.split('/').reduce((memo, item) => {
    if (item === 'articles') {
      return '';
    }
    if (!item || /\.md/.test(item)) {
      return memo;
    }
    return item;
  }, '');
  return dirName ? dirName.replace(/_/, '') : 'uncategorized';
};