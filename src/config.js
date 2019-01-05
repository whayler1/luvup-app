// const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
// const baseUrl = process.env.BASE_URL || 'https://luvup.io';
const baseUrl = 'http://172.19.0.75:3000';
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
