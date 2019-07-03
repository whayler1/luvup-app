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
    senderId,
    recipientEmail,
    recipientFirstName,
    recipientLastName
  ) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      createRelationshipWithInvite(
        senderId: "${senderId}"
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
