export default (path, suffix) => {
  let dirName = path.split('/').reduce((memo, item) => {
    if (item === 'articles') {
      return '';
    }
    if (!item || /\.md/.test(item)) {
      return memo;
    }
    return item;
  }, '');
  if (!dirName) {
    dirName = 'uncategorized';
  }
  else {
    dirName = dirName.replace(/_/, '');
  }

  return suffix ? dirName.slice(3) : dirName.slice(0,3);
}