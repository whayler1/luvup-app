import React from 'react';
import App from './App';

import { fetch } from 'whatwg-fetch';
console.log('fetch', fetch);
global.fetch = fetch;

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
