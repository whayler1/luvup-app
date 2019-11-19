import superagent from 'superagent';

import config from '../config';

const TIMEOUT_DEFAULTS = {
  response: 10000,
  deadline: 30000,
};

const api = () => ({
  post: (path = '', ...args) =>
    superagent
      .post(`${config.baseUrl}${path}`, ...args)
      .timeout(TIMEOUT_DEFAULTS),
});

export const graphqlQuery = query =>
  superagent.post(config.graphQlUrl, { query }).timeout(TIMEOUT_DEFAULTS);

export default api;
