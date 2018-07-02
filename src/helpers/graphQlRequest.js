import superagent from 'superagent';
import config from '../config';
import _ from 'lodash';

const graphQlRequest = async (query) => {
  try {
    const res = await superagent.post(config.graphQlUrl, { query });
    const data = _.get(res, 'body.data');

    if (res.ok && data) {
      return data;
    } else {
      throw new Error('Graph QL response error');
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default graphQlRequest;
