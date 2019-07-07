import superagent from 'superagent';
import config from '../../config';

const userInviteApi = {
  getUserInvite: () =>
    superagent.post(config.graphQlUrl, {
      query: `{ userInvite { userInvite {
        id recipientEmail recipientFirstName recipientLastName
      } } }`,
    }),
};

export default userInviteApi;
