import 'babel-polyfill';
import detox from 'detox';
const config = require('../package.json').detox;
import adapter from 'detox/runners/jest/adapter';

jest.setTimeout(120000);
/* eslint-disable no-undef */
jasmine.getEnv().addReporter(adapter);
/* eslint-enable no-undef */

beforeAll(async () => {
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
