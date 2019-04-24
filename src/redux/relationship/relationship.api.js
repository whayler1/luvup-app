import superagent from 'superagent';

import config from '../../config';

const relationshipApi = {
  endRelationship: () =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
        endRelationship {
          relationship {
            id endDate
          }
        }
      }`,
    }),
};

export default relationshipApi;
