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
    show(directory) {
      return axios(directoryModel.categoryUrl({directory: asDirectory(directory)}))
        .then((result) => result.data);
    },

    categoryUrl(directory) {
      return `${URI_ROOT}/categories/${encodePath(directory)}.json`;
    }
  }
;

export default directoryModel;