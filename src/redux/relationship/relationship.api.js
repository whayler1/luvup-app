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
  createRelationshipWithInvite: (
    recipientEmail,
    recipientFirstName,
    recipientLastName
  ) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      createRelationshipWithInvite(
        recipientEmail: "${recipientEmail}"
        recipientFirstName: "${recipientFirstName}"
        recipientLastName: "${recipientLastName}"
      ) {
        loverRequest { id }
        relationship { id }
        userInvite { id }
      }
    }`,
    }),
};

export default relationshipApi;
