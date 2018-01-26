const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
}

export default config;
