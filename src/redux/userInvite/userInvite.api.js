import superagent from 'superagent';
import config from '../../config';

const userInviteApi = {
  getUserInvite: () =>
    superagent.post(config.graphQlUrl, {
      query: `{ userInvite { userInvite {
        id recipientEmail recipientFirstName recipientLastName
      } } }`,
    }),
  resendUserInvite: (userInviteId, recipientEmail) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
        resendInvite(
          userInviteId: "${userInviteId}"
          recipientEmail: "${recipientEmail}"
        ) { userInvite { id } }
      }`,
    }),
};

export default userInviteApi;
