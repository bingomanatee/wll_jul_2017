
export default  (directory) => {
    let shortDir = directory.replace(/^articles\//i, '');
    return shortDir || 'Uncategorized';
};
