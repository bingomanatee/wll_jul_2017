import axios from 'axios';
import encodePath from '../utils/encodePath';
import _ from 'lodash';
import {URI_ROOT} from '../config';

const asDirectory = (input) => {
  if (!input) {
    return '';
  } else if (_.isObject(input) && input.directory) {
    return input.directory;
  } else {
    return _.toString(input);
  }
}

const directoryModel = {
    load(directory) {
      return axios(directoryModel.categoryUrl(directory))
        .then((result) => result.data);
    },

    categoryUrl(directory) {
      return `${URI_ROOT}/categories/${encodePath(asDirectory(directory))}.json`;
    }
  }
;

export default directoryModel;