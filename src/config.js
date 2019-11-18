const baseUrl = __DEV__ ? 'http://localhost:3000/api' : 'https://luvup.io/api';

const segmentWriteKey =
  process.env.SEGMENT_WRITE_KEY || '8m6bF7b3J2aDf6t2sF5NLSmLhwpb0UVm';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
  segmentWriteKey,
  maxItemsPerHour: 5,
  swipeThreshold: 40,
};

export default config;
