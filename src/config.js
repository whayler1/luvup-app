const LOCAL_IP = '192.168.1.183'; // ifconfig | grep inet
const BASE_URL = __DEV__
  ? `http://${LOCAL_IP}:3000/api`
  : 'https://luvup.io/api';

const SEGMENT_WRITE_KEY =
  process.env.SEGMENT_WRITE_KEY || '8m6bF7b3J2aDf6t2sF5NLSmLhwpb0UVm';

const config = {
  baseUrl: BASE_URL,
  graphQlUrl: `${BASE_URL}/graphql`,
  segmentWriteKey: SEGMENT_WRITE_KEY,
  maxItemsPerHour: 5,
  swipeThreshold: 40,
};

export default config;
