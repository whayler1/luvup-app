import superagent from 'superagent';
import config from '../../config';

const postWithOptionalIdToken = (params, idToken) => {
  if (idToken) {
    return superagent
      .post(config.graphQlUrl, params)
      .set('Cookie', `id_token=${idToken}`);
  }

  return superagent.post(config.graphQlUrl, params);
};

const loverRequestApi = {
  createLoverRequestAndRelationshipAndPlaceholderLover: (
    recipientId,
    idToken
  ) => {
    const params = {
      query: `mutation {
        createLoverRequestAndRelationshipAndPlaceholderLover(recipientId: "${recipientId}") {
          loverRequest {
            id isAccepted isSenderCanceled isRecipientCanceled createdAt
          }
          relationship {
            id createdAt updatedAt
            lovers {
              id username email firstName lastName isPlaceholder
            }
          }
        }
      }`,
    };
    return postWithOptionalIdToken(params, idToken);
  },
  requestLover: (recipientId, idToken) => {
    const params = {
      query: `mutation {
      requestLover(recipientId: "${recipientId}") {
        loverRequest {
          id isAccepted isSenderCanceled isRecipientCanceled createdAt
          recipient {
            username firstName lastName
          }
        }
        relationship {
          id createdAt updatedAt
          lovers {
            id username email firstName lastName isPlaceholder
          }
        }
      }
    }`,
    };
    return postWithOptionalIdToken(params, idToken);
  },
  cancelLoverRequest: loverRequestId =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      cancelLoverRequest(
        loverRequestId: "${loverRequestId}"
      ) {
        loverRequest {
          id isAccepted isSenderCanceled isRecipientCanceled
        }
        relationship {
          id
        }
        error
      }
    }`,
    }),
  cancelSentLoverRequestAndRelationship: () => {
    const params = {
      query: `mutation {
        cancelSentLoverRequestAndRelationship {
          loverRequest { id isAccepted isSenderCanceled isRecipientCanceled }
          relationship { id endDate }
        }
      }`,
    };

    return superagent.post(config.graphQlUrl, params);
  },
  resendLoverRequestEmail: (loverRequestId, email) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      resendLoverRequestEmail (
        loverRequestId: "${loverRequestId}"
        email: "${email}"
      ) {
        success error
      }
    }`,
    }),
};

export default loverRequestApi;
