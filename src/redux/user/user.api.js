import superagent from 'superagent';
import config from '../../config';
import graphQlRequest from '../../helpers/graphQlRequest';

// const superagent = superagentDefault.agent();

const userApi = {
  login: (usernameOrEmail, password) =>
    superagent.post(`${config.baseUrl}/login`, {
      username: usernameOrEmail,
      password,
    }),
  reauth: id_token => superagent.post(`${config.baseUrl}/reauth`, { id_token }),
  getMe: () =>
    superagent.post(config.graphQlUrl, {
      query: `{
      me {
        id username email firstName lastName
        relationship {
          id createdAt
          lovers {
            id username firstName lastName
          }
        }
      }
      activeLoverRequest {
        loverRequest {
          id isAccepted isSenderCanceled isRecipientCanceled createdAt
          recipient {
            username firstName lastName
          }
        }
      }
      receivedLoverRequests {
        rows {
          id
          sender {
            id email firstName lastName
          }
        }
        count
      }
      sentCoins(limit: ${config.maxItemsPerHour}) {
        rows {
          id createdAt isUsed
        }
        count
      }
      sentJalapenos(limit: ${config.maxItemsPerHour}) {
        rows {
          id createdAt isExpired
        }
        count
      }
      unviewedEventCounts {
        coinsReceived jalapenosReceived
      }
      receivedLoveNotes(
        limit: 2,
        offset: 0,
        isRead: false,
      ) {
        rows { id, createdAt, isRead, note }
        count
      }
      relationshipScores(limit: 1) {
        rows {
          score
        }
      }
    }`,
    }),
  userRequest: email =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      userRequest( email: "${email}") { email }
    }`,
    }),
  confirmUser: (email, username, firstName, lastName, code, password) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      confirmUser(
        email: "${email}"
        username: "${username}"
        firstName: "${firstName}"
        lastName: "${lastName}"
        password: "${password}"
        code: "${code}"
      ) {
        user {
          id
          email
          username
          firstName
          lastName
        }
        error
      }
    }`,
    }),
  confirmUserRequestCode: (email, code) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      confirmUserRequestCode (
        email: "${email}"
        code: "${code}"
      ) {
        success error
      }
    }`,
    }),
  getTimelineData: limit =>
    graphQlRequest(`{
    userEvents(
      limit: ${limit}
      offset: 0
    ) {
      rows {
        id isViewed createdAt name
      }
      count
      loveNoteEvents {
        id loveNoteId userEventId
      }
      loveNotes {
        id note createdAt isRead senderId recipientId numLuvups numJalapenos
      }
      quizItemEvents {
        id quizItemId userEventId
      }
      quizItems {
        id senderId recipientId question senderChoiceId recipientChoiceId reward createdAt
        choices { id answer }
      }
    }
    sentCoins(limit: 0) { count }
    sentJalapenos(limit: 0) { count }
  }`),
};

export default userApi;
