import pathToDirectory from './pathToDirectory';

export default (path, suffix) => {
  const dirName = pathToDirectory(path).replace('_', ' ');
  return suffix ? dirName.slice(3) : dirName.slice(0,3);
}