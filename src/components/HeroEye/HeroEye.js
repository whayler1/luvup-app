import React from 'react';
import { Group, Shape, Surface } from 'ReactNativeART';

import Circle from '../Circle';

export const DEFAULT_WIDTH = 83;
export const DEFAULT_HEIGHT = 35;

export default ({ scale = 1 }) => (
  <Surface width={DEFAULT_WIDTH * scale} height={DEFAULT_HEIGHT * scale}>
    <Group x={2 * scale} y={2 * scale} scale={scale}>
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
    <Group x={40 * scale} y={22 * scale} scale={scale}>
      <Circle radius={6 * scale} fill="white" />
    </Group>
  </Surface>
);
