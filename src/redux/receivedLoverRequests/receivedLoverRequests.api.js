import superagent from 'superagent';
import config from '../../config';

const receivedLoverRequestsApi = {
  getReceivedLoverRequests: () =>
    superagent.post(config.graphQlUrl, {
      query: `{
      receivedLoverRequests {
        rows {
          id
          createdAt
          sender {
            id email firstName lastName
          }
        }
        count
      }
    }`,
    }),
  acceptLoverRequest: (loverRequestId, id_token) => {
    const params = {
      query: `mutation {
      acceptLoverRequest(
        loverRequestId: "${loverRequestId}"
      ) {
        loverRequest {
          id isAccepted isSenderCanceled isRecipientCanceled createdAt
        }
        relationship {
          id createdAt updatedAt
          lovers { id email firstName lastName }
        }
        relationshipScore { id createdAt score }
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
};

export default receivedLoverRequestsApi;
