const baseUrl = 'http://localhost:3000';
// const baseUrl = 'http://192.168.1.206:3000';
// const baseUrl = 'https://app.luvup.io';
// const baseUrl = 'https://luvup-api.justinworsdale.now.sh';
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
