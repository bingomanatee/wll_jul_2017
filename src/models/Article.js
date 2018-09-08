import axios from 'axios';
import encodePath from '../utils/encodePath';
import _ from 'lodash';
import {URI_ROOT} from '../config';
import {Actions} from 'jumpsuit';

const asPath = (input) => {
  if (!input) {
    return '';
  } else if (_.isObject(input) && input.path) {
    return input.path;
  } else {
    return _.toString(input);
  }
}

const articleModel = {
  load(path) {
    return axios(articleModel.articleUrl(asPath(path)))
      .then((result) => result.data);
  },

  create(article, apiToken, sub) {
    console.log('creating article ', article);

    return axios({
      method: 'POST',
      url: `${URI_ROOT}/articles.json`,
      headers: {
        'access_token': apiToken,
        'sub': sub,
      },
      data: article
    })
      .then(() => {
        Actions.getHomepageArticles();
      }).catch((err) => {
        console.log('error updating articles:', err);
      });

  },
  save(article, apiToken, sub) {
    return axios({
      method: 'PUT',
      url: articleModel.articleUrl(article),
      headers: {
        'access_token': apiToken,
        'sub': sub,
      },
      data: article
    })
      .then(() => {
        Actions.getHomepageArticles();
      }).catch((err) => {
        console.log('error creating articles:', err);
      });

  },

  articleUrl(path) {
    path = encodePath(asPath(path));
    return `${URI_ROOT}/articles/${path}.json`;
  }
};

export default articleModel;
