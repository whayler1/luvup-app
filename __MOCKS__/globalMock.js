import { fetch } from 'whatwg-fetch';
console.log('fetch', fetch);
global.fetch = fetch;
