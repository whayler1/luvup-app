import superagent from 'superagent';
import config from '../../config';

const loverRequestApi = {
  requestLover: recipientId =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      requestLover(recipientId: "${recipientId}") {
        id isAccepted isSenderCanceled isRecipientCanceled createdAt
        recipient {
          username firstName lastName
        }
      }
    }`,
    }),
  cancelLoverRequest: loverRequestId =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      cancelLoverRequest(
        loverRequestId: "${loverRequestId}"
      ) {
        loverRequest {
          id isAccepted isSenderCanceled isRecipientCanceled
        }
        error
      }
    }`,
    }),
  resendLoverRequestEmail: loverRequestId =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      resendLoverRequestEmail (
        loverRequestId: "${loverRequestId}"
      ) {
        success error
      }
    }`,
    }),
};

export default loverRequestApi;
