import React from 'react';
import ReactArt, { Group, Shape, Surface, Transform } from 'ReactNativeART';

import Circle from '../Circle';

export default () => (
  <Surface width={83} height={35}>
    <Group x={2} y={2}>
      <Shape
        stroke="white"
        strokeWidth={4}
        d={
          'M13,25 C21.5552271,15 31.7218938,10 43.5,10 C55.2781062,10 65.4447729,15 74,25'
        }
      />
      <Shape
        stroke="white"
        strokeWidth={4}
        d={'M9.73684211,20.7307692 L0.263157895,14.2692308'}
      />
      <Shape stroke="white" strokeWidth={4} d={'M17.725,13.7272727 L7,2'} />
      <Shape stroke="white" strokeWidth={4} d={'M24.75,9.72222222 L20,0'} />
    </Group>
    <Group x={40} y={22}>
      <Circle radius={6} fill={'white'} />
    </Group>
  </Surface>
);
