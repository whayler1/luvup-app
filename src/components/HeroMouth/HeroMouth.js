import React from 'react';
import { Group, Shape, Surface } from 'ReactNativeART';

export const DEFAULT_WIDTH = 91;

const Saddest = () => (
  <Shape stroke="white" strokeWidth={4} d={'M14.5,2.5 L77.5,2.5'} />
);
const Sad = () => (
  <Shape
    stroke="white"
    strokeWidth={4}
    d={
      'M2.5,2.5 C19.0494792,6.72395833 31.5494792,8.8359375 40,8.8359375 C48.4505208,8.8359375 60.9505208,6.72395833 77.5,2.5'
    }
  />
);
const Happy = () => [
  <Shape
    key={0}
    stroke="white"
    strokeWidth={4}
    d={
      'M3,3 C18.7560764,4.22395833 32.9227431,6.3359375 42.5,6.3359375 C52.0772569,6.3359375 66.2439236,4.22395833 85,3'
    }
  />,
  <Shape
    key={1}
    stroke="white"
    strokeWidth={4}
    d={
      'M3,3 C13.234375,7.5 27.4010417,10.75 42.5,10.75 C57.5989583,10.75 71.765625,7.5 85,3'
    }
  />,
];
const Happiest = () => [
  <Shape
    key={0}
    stroke="white"
    strokeWidth={4}
    d={
      'M3,3 C14.7135417,5.9296875 28.8802083,8.89453125 42.5,8.89453125 C56.1197917,8.89453125 70.2864583,5.9296875 85,3'
    }
  />,
  <Shape
    key={1}
    stroke="white"
    strokeWidth={4}
    d={
      'M3,3 C13.234375,12.4296875 27.4010417,18.1445312 42.5,18.1445312 C57.5989583,18.1445312 71.765625,12.4296875 85,3'
    }
  />,
];

const mouths = [
  <Saddest key="saddest" />,
  <Sad key="sad" />,
  <Happy key="happy" />,
  <Happiest key="happiest" />,
];

export default ({ relationshipScoreQuartile, dragDirection, scale = 1 }) => (
  <Surface width={DEFAULT_WIDTH} height={20 * scale}>
    <Group scale={scale}>
      {(() => {
        if (dragDirection === 1) {
          return <Happiest />;
        } else if (dragDirection === -1) {
          return <Saddest />;
        }
        return mouths[relationshipScoreQuartile];
      })()}
    </Group>
  </Surface>
);
