import moment from 'moment';

const NO_DATE = '??';

export default (article) => {
  if (!(article && article.fileRevised)) {
    return NO_DATE;
  }
  let articleDate = moment(article.fileRevised);
  if (!articleDate.isValid()) {
    return NO_DATE;
  }
  return articleDate.format('MMM D YY');
}
