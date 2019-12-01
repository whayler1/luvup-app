import config from '../../config';
import api, { graphqlQuery } from '../api';
// JW: trying to get rid of `graphQlRequest` and replace with `graphqlQuery`
import graphQlRequest from '../../helpers/graphQlRequest';

const sanitizeEmail = (email) => email.toLowerCase().trim();
const sanitizePassword = (password) => password.trim();

const userApi = {
  login: (usernameOrEmail, password) =>
    api().post('/login', {
      username: sanitizeEmail(usernameOrEmail),
      password: sanitizePassword(password),
    }),
  sendNewPassword: (email) =>
    graphqlQuery(`mutation {
      sendNewPassword(email: "${sanitizeEmail(email)}") { success }
    }`),
  resetPasswordWithGeneratedPassword: (generatedPassword, newPassword) =>
    graphqlQuery(`mutation {
        resetPasswordWithGeneratedPassword(
          generatedPassword: "${sanitizePassword(generatedPassword)}"
          newPassword: "${sanitizePassword(newPassword)}"
        ) { success }
      }`),
  reauth: (id_token) => api().post(`/reauth`, { id_token }),
  getMe: () =>
    graphqlQuery(`{
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
      coinCount { count }
      sentCoins(limit: ${config.maxItemsPerHour}) {
        rows {
          id createdAt isUsed
        }
        count
      }
      jalapenos(limit: 0) { count }
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
    }`),
  userRequest: (email) =>
    graphqlQuery(`mutation {
      userRequest( email: "${sanitizeEmail(email)}") { email }
    }`),
  confirmUser: (email, username, firstName, lastName, code, password) =>
    graphqlQuery(`mutation {
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
      }
    }`),
  confirmUserRequestCode: (email, code) =>
    graphqlQuery(`mutation {
      confirmUserRequestCode (
        email: "${sanitizeEmail(email)}"
        code: "${code}"
      ) {
        success error
      }
    }`),
  getTimelineData: (limit) =>
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
