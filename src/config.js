// const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const baseUrl = process.env.BASE_URL || 'https://luvup.io';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
  maxItemsPerHour: 15,
  swipeThreshold: 40,
}

export default config;
