import React from 'react';
import { ART as Art } from 'react-native';

export default ({ radius, ...rest }) => {
  const circle = Art.Path()
    .move(radius, 0)
    .arc(0, radius * 2, radius)
    .arc(0, radius * -2, radius);

  return <Art.Shape {...rest} d={circle} />;
};
