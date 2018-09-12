import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const TearDropArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={68 * scale} height={98 * scale}>
      <Path
        {...props}
        d="M58.9,49 L34,5.8 L9.1,49 C-2,68.2 11.8,92.2 34,92.2 C56.2,92.2 70,68.2 58.9,49 Z"
      />
      <Path
        {...props}
        d="M63.2,46.5 C54.9,32.1 46.6,17.7 38.3,3.3 C36.4,0.1 31.5,0.1 29.7,3.3 C24,13.2 18.3,23 12.6,32.9 C5.6,45 -1.9,56 1,70.8 C5,90.6 26.9,101.6 45.4,95.2 C65.4,88.3 73.1,64.4 63.2,46.5 C60.1,40.8 51.5,45.9 54.6,51.5 C62.7,66.2 53.7,85.1 36.7,87 C19.6,88.9 6.7,72.4 11.3,56.3 C12.2,53 14.3,50 16,47 C18.9,42 21.8,37 24.6,32.1 C29.2,24.2 33.7,16.3 38.3,8.4 C35.4,8.4 32.5,8.4 29.7,8.4 C38,22.7 46.3,37.1 54.6,51.5 C57.8,57.1 66.5,52.1 63.2,46.5 Z"
      />
    </Svg>
  );
};

export default TearDropArt;
