import superagent from 'superagent';
import config from '../../config';

const receivedLoverRequestsApi = {
  getReceivedLoverRequests: () =>
    superagent.post(config.graphQlUrl, {
      query: `{
      receivedLoverRequests {
        rows {
          id
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
        error
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
