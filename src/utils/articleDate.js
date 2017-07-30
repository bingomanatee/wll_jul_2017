import moment from 'moment';

const NO_DATE = '??';

export default (article) => {
  if (!(article && article.file_revised)) {
    return NO_DATE;
  }
  let articleDate = moment(article.file_revised);
  if (!articleDate.isValid()) {
    return NO_DATE;
  }
  return articleDate.format('MMM D YY');
}