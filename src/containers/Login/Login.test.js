import React from 'react';
import Login from './Login';

import renderer from 'react-test-renderer';
import { store } from '../../redux';

it('renders without crashing', () => {
  const rendered = renderer.create(<Login store={store} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(rendered).toMatchSnapshot();
});
