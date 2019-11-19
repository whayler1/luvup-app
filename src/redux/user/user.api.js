import superagent from 'superagent';
import config from '../../config';
import graphQlRequest from '../../helpers/graphQlRequest';

const sanitizeEmail = email => email.toLowerCase().trim();
const sanitizePassword = password => password.trim();

const userApi = {
  login: (usernameOrEmail, password) =>
    superagent.post(`${config.baseUrl}/login`, {
      username: sanitizeEmail(usernameOrEmail),
      password: sanitizePassword(password),
    }),
  sendNewPassword: email =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
        sendNewPassword(email: "${sanitizeEmail(email)}") { success }
      }`,
    }),
  resetPasswordWithGeneratedPassword: (generatedPassword, newPassword) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
        resetPasswordWithGeneratedPassword(
          generatedPassword: "${sanitizePassword(generatedPassword)}"
          newPassword: "${sanitizePassword(newPassword)}"
        ) { success }
      }`,
    }),
  reauth: id_token =>
    superagent.post(`${config.baseUrl}/reauth`, { id_token }).timeout({
      response: 10000,
      deadline: 30000,
    }),
  getMe: () =>
    superagent.post(config.graphQlUrl, {
      query: `{
      me {
        id username email firstName lastName
        relationship {
          id createdAt
          lovers {
            id email username firstName lastName isPlaceholder
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
          id createdAt
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
      userRequest( email: "${sanitizeEmail(email)}") { email }
    }`,
    }),
  confirmUser: (email, username, firstName, lastName, code, password) =>
    superagent.post(config.graphQlUrl, {
      query: `mutation {
      confirmUser(
        email: "${sanitizeEmail(email)}"
        username: "${username}"
        firstName: "${firstName}"
        lastName: "${lastName}"
        password: "${sanitizePassword(password)}"
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
        email: "${sanitizeEmail(email)}"
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
    coinCount { count }
    jalapenos(limit: 0) { count }
    sentCoins(limit: 0) { count }
    sentJalapenos(limit: 0) { count }
    lover {
      relationshipScore { score }
    }
    relationshipScores(limit: 1) { rows { score } }
  }`),
};

export default userApi;
