export const SET_RECEIVED_LOVER_REQUESTS = 'receivedLoverRequests/set-received-lover-requests';

export const setReceivedLoverRequests = (rows, count) => ({
  type: SET_RECEIVED_LOVER_REQUESTS,
  rows,
  count,
});
