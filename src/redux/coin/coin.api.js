import superagent from 'superagent';
import config from '../../config';

const coinApi = {
  sendCoin: () =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      sendCoin {
        coin { id createdAt }
        relationshipScore { score }
      }
    }`,
    }),
  getCoinCount: () =>
    superagent.post(config.graphQlUrl, {
      query: `{ coinCount { count } }`,
    }),
};

export default coinApi;
