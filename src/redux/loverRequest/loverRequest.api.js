import superagent from 'superagent';
import config from '../../config';

const request = query =>
  superagent.post(config.graphQlUrl, { params: { query } });

const loverRequestApi = {
  requestLover: (recipientId, id_token) => {
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
    if (id_token) {
      return superagent
        .post(config.graphQlUrl, params)
        .set('Cookie', `id_token=${id_token}`);
    }

    return superagent.post(config.graphQlUrl, params);
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
  cancelSentLoverRequestAndRelationship: () =>
    request(`mutation {
    cancelSentLoverRequestAndRelationship {
      loverRequest { id isAccepted isCanceled isSenderCanceled isRecipientCanceled }
      relationship { id endDate }
    }
  }`),
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
