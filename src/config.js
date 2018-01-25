const baseUrl = process.env.BASE_URL || 'https://luvup.io';

const config = {
  baseUrl,
  graphQlUrl: `${baseUrl}/graphql`,
}

export default config;
