import _ from 'lodash';

export default(directory, dirs) => {
  if (dirs) {
    console.log('categoryName passed dirs: ', dirs);
    for (let dir of dirs) {
      if (dir.directory === directory) return dir.title;
    }
  } else {
    console.log('no dirs');
  }
  return directory;
}
