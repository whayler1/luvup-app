import superagent from 'superagent';
import config from '../../config';

const userInviteApi = {
  getUserInvite: () =>
    superagent.post(config.graphQlUrl, {
      query: `{ userInvite { userInvite {
        id recipientEmail recipientFirstName recipientLastName
      } } }`,
    }),
  getUserInviteWithId: userInviteId =>
    superagent.post(config.graphQlUrl, {
      query: `{
        userInviteWithId(userInviteId: "${userInviteId}") {
          userInvite { id senderId recipientEmail recipientFirstName recipientLastName }
          sender { id email isPlaceholder username firstName lastName }
          loverRequest { id isAccepted isSenderCanceled isRecipientCanceled }
        }
      }`,
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
