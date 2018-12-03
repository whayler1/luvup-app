import { fetch } from 'isomorphic-fetch'; // from a dependency node module that I spoke of in the previous solution.
console.log('MOCK MOCKMOCK');
global.fetch = fetch;
