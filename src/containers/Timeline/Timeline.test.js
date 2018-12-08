import React from 'react';
import renderer from 'react-test-renderer';

import Timeline from './Timeline';
import store from '../../redux';

it('renders without crashing', () => {
  const rendered = renderer.create(<Timeline store={store} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(rendered).toMatchSnapshot();
});
