import moment from 'moment';

const getRecentlySentTokenCount = (collection) => {
  const anHrAgo = moment().subtract(1, 'hour');
  let count = 0;

  for (let i = 0; i < collection.length; i++) {
    if (moment(new Date(collection[i].createdAt)).isAfter(anHrAgo)) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

export default getRecentlySentTokenCount;
