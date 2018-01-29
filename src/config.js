const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
  maxItemsPerHour: 5,
  swipeThreshold: 60,
}

export default config;
