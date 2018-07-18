import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop,
} from 'react-native-svg';
import _ from 'lodash';

import { vars } from '../../styles';

const defaultColor = vars.blueGrey500;

export default ({ fill, scale = 1 }) => (
  <Svg width={84 * scale} height={82 * scale}>
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M1.5,81.3 C1,81.3 0.6,81.1 0.3,80.7 C-0.2,80 2.10942375e-15,79.1 0.7,78.6 L31.1,56.6 C31.8,56.1 32.7,56.3 33.2,56.9 C33.7,57.6 33.5,58.5 32.9,59 L2.4,81 C2.2,81.2 1.8,81.3 1.5,81.3 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M81,81.3 C80.7,81.3 80.4,81.2 80.1,81 L49.6,59.2 C48.9,58.7 48.8,57.8 49.3,57.1 C49.8,56.4 50.7,56.3 51.4,56.8 L82,78.6 C82.7,79.1 82.8,80 82.3,80.7 C81.9,81.1 81.5,81.3 81,81.3 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M51.5,11.5 C51.2,11.5 50.8,11.4 50.6,11.2 L41.7,4 L32.9,11 C32.3,11.5 31.3,11.4 30.8,10.8 C30.3,10.2 30.4,9.2 31,8.7 L40.7,0.8 C41.2,0.4 42,0.4 42.6,0.8 L52.4,8.8 C53,9.3 53.1,10.3 52.6,10.9 C52.4,11.3 52,11.5 51.5,11.5 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M81.8,81.3 L1.5,81.3 C0.7,81.3 0,80.6 0,79.8 L0,34.5 C0,34 0.2,33.6 0.6,33.3 L11.9,24.1 C12.5,23.6 13.5,23.7 14,24.3 C14.5,24.9 14.4,25.9 13.8,26.4 L3,35.2 L3,78.3 L80.3,78.3 L80.3,35.2 L69.5,26.4 C68.9,25.9 68.8,24.9 69.3,24.3 C69.8,23.7 70.8,23.6 71.4,24.1 L82.8,33.3 C83.2,33.6 83.4,34 83.4,34.5 L83.4,79.8 C83.3,80.7 82.6,81.3 81.8,81.3 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M41.7,63.8 C41.4,63.8 41.1,63.7 40.8,63.5 L0.7,35.7 C1.33226763e-15,35.2 -0.1,34.3 0.3,33.6 C0.8,32.9 1.7,32.7 2.4,33.2 L41.7,60.4 L81,33.2 C81.7,32.7 82.6,32.9 83.1,33.6 C83.6,34.3 83.4,35.2 82.7,35.7 L42.5,63.6 C42.3,63.7 42,63.8 41.7,63.8 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M69.6,43.5 C68.8,43.5 68.1,42.8 68.1,42 L68.1,12 L15.2,12 L15.2,42 C15.2,42.8 14.5,43.5 13.7,43.5 C12.9,43.5 12.2,42.8 12.2,42 L12.2,10.5 C12.2,9.7 12.9,9 13.7,9 L69.5,9 C70.3,9 71,9.7 71,10.5 L71,42 C71.1,42.8 70.4,43.5 69.6,43.5 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M40.8,23 L21.2,23 C20.4,23 19.7,22.3 19.7,21.5 C19.7,20.7 20.4,20 21.2,20 L40.9,20 C41.7,20 42.4,20.7 42.4,21.5 C42.4,22.3 41.7,23 40.8,23 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M61.3,29.3 L21.2,29.3 C20.4,29.3 19.7,28.6 19.7,27.8 C19.7,27 20.4,26.3 21.2,26.3 L61.4,26.3 C62.2,26.3 62.9,27 62.9,27.8 C62.9,28.6 62.2,29.3 61.3,29.3 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M61.3,35.8 L21.2,35.8 C20.4,35.8 19.7,35.1 19.7,34.3 C19.7,33.5 20.4,32.8 21.2,32.8 L61.4,32.8 C62.2,32.8 62.9,33.5 62.9,34.3 C62.9,35.1 62.2,35.8 61.3,35.8 Z"
    />
    <Path
      fill={fill || defaultColor}
      scale={scale}
      d="M61.3,42.3 L21.2,42.3 C20.4,42.3 19.7,41.6 19.7,40.8 C19.7,40 20.4,39.3 21.2,39.3 L61.4,39.3 C62.2,39.3 62.9,40 62.9,40.8 C62.9,41.6 62.2,42.3 61.3,42.3 Z"
    />
  </Svg>
);
