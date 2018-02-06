import React from 'react';
import ReactArt, {
    Group,
    Shape,
    Surface,
    Transform,
} from 'ReactNativeART';

import Circle from '../Circle';

export default ({
  relationshipScoreQuartile,
}) => (
  <Surface
    width={91}
    height={20}
  >
    <Group>
      {!relationshipScoreQuartile && <Shape
        stroke="white"
        strokeWidth={4}
        d={"M2.5,2.5 L77.5,2.5"}
      />}
      {relationshipScoreQuartile === 1 && <Shape
        stroke="white"
        strokeWidth={4}
        d={"M2.5,2.5 C19.0494792,6.72395833 31.5494792,8.8359375 40,8.8359375 C48.4505208,8.8359375 60.9505208,6.72395833 77.5,2.5"}
      />}
      {relationshipScoreQuartile === 2 && [<Shape
        key={0}
        stroke="white"
        strokeWidth={4}
        d={"M3,3 C18.7560764,4.22395833 32.9227431,6.3359375 42.5,6.3359375 C52.0772569,6.3359375 66.2439236,4.22395833 85,3"}
      />,
      <Shape
        key={1}
        stroke="white"
        strokeWidth={4}
        d={"M3,3 C13.234375,7.5 27.4010417,10.75 42.5,10.75 C57.5989583,10.75 71.765625,7.5 85,3"}
      />]}
      {relationshipScoreQuartile === 3 && [<Shape
        key={0}
        stroke="white"
        strokeWidth={4}
        d={"M3,3 C14.7135417,5.9296875 28.8802083,8.89453125 42.5,8.89453125 C56.1197917,8.89453125 70.2864583,5.9296875 85,3"}
      />,
      <Shape
        key={1}
        stroke="white"
        strokeWidth={4}
        d={"M3,3 C13.234375,12.4296875 27.4010417,18.1445312 42.5,18.1445312 C57.5989583,18.1445312 71.765625,12.4296875 85,3"}
      />]}
    </Group>
  </Surface>
);
