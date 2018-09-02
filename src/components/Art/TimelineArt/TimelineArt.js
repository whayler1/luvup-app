import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const TimelineArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={70 * scale} height={74 * scale}>
      <Path
        {...props}
        d="M70,64 L24,64 C22.1,64 16,57 16,57 C16,57 22.1,50 24,50 L70,50 C72.2,50 74,51.8 74,54 L74,60 C74,62.2 72.2,64 70,64 Z M70,42 L24,42 C22.1,42 16,35 16,35 C16,35 22.1,28 24,28 L70,28 C72.2,28 74,29.8 74,32 L74,38 C74,40.2 72.2,42 70,42 Z M70,20 L24,20 C22.1,20 16,13 16,13 C16,13 22.1,6 24,6 L70,6 C72.2,6 74,7.8 74,10 L74,16 C74,18.2 72.2,20 70,20 Z M5,62 C2.2,62 0,59.8 0,57 C0,54.2 2.2,52 5,52 C7.8,52 10,54.2 10,57 C10,59.8 7.8,62 5,62 Z M6,41.9 L6,50.1 C5.7,50.1 5.3,50 5,50 C4.7,50 4.3,50.1 4,50.1 L4,41.9 C4.3,41.9 4.7,42 5,42 C5.3,42 5.7,41.9 6,41.9 Z M5,40 C2.2,40 0,37.8 0,35 C0,32.2 2.2,30 5,30 C7.8,30 10,32.2 10,35 C10,37.8 7.8,40 5,40 Z M6,19.9 L6,28.1 C5.7,28.1 5.3,28 5,28 C4.7,28 4.3,28.1 4,28.1 L4,19.9 C4.3,19.9 4.7,20 5,20 C5.3,20 5.7,19.9 6,19.9 Z M5,18 C2.2,18 0,15.8 0,13 C0,10.2 2.2,8 5,8 C7.8,8 10,10.2 10,13 C10,15.8 7.8,18 5,18 Z M4,6.1 L4,1 C4,0.4 4.4,0 5,0 C5.6,0 6,0.4 6,1 L6,6.1 C5.7,6.1 5.3,6 5,6 C4.7,6 4.3,6.1 4,6.1 Z M6,63.9 L6,69 C6,69.6 5.6,70 5,70 C4.4,70 4,69.6 4,69 L4,63.9 C4.3,63.9 4.7,64 5,64 C5.3,64 5.7,63.9 6,63.9 Z"
      />
    </Svg>
  );
};

export default TimelineArt;
