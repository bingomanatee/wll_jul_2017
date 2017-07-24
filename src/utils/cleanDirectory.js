import _ from 'lodash';

export default (dir) =>  _.isString(dir) ? dir.replace(/^articles(\/)?/, '') : '--';