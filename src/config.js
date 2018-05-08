// const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const baseUrl = process.env.BASE_URL || 'https://luvup.io';
const segmentWriteKey = process.env.SEGMENT_WRITE_KEY || '';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
  segmentWriteKey,
  maxItemsPerHour: 5,
  swipeThreshold: 40,
}

export default config;
