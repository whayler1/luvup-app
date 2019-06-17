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
  getSentCoins: (limit, offset) =>
    superagent.post(config.graphQlUrl, {
      query: `{
      sentCoins(
        limit: "${limit}"
        offset: "${offset}"
      ) {
        rows {
          id createdAt
        }
        count
      }
    }`,
    }),
};

export default coinApi;
