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
  <Svg width={105 * scale} height={50 * scale}>
    <Path
      fill={fill || defaultColor}
      d="M98.339,0 L35.66,0 C33.173,0.007 31.168,2.012 31.161,4.5 L31.161,45 C31.168,47.488 33.172,49.493 35.66,49.5 L98.339,49.5 C100.827,49.493 102.832,47.488 102.84,45 L102.84,4.5 C102.832,2.011 100.826,0.007 98.339,0 Z M35.018,6.169 L47.11,16.715 L35.018,27.259 L35.018,6.169 Z M98.982,45 C98.982,45.175 98.915,45.326 98.791,45.452 C98.666,45.574 98.514,45.643 98.339,45.643 L35.66,45.643 C35.485,45.643 35.333,45.574 35.208,45.452 C35.086,45.326 35.019,45.175 35.018,45 L35.018,32.378 L50.044,19.274 L54.263,22.953 C54.202,21.147 54.633,19.768 55.288,18.729 L38.234,3.857 L95.763,3.857 L78.729,18.713 C79.454,19.909 79.665,21.001 79.665,21.001 C79.77,21.722 79.775,22.372 79.721,22.967 L83.957,19.274 L98.983,32.378 L98.983,45 L98.982,45 Z M98.982,27.259 L86.89,16.715 L98.983,6.17 L98.983,27.259 L98.982,27.259 Z"
      scale={scale}
    />
    <Path
      fill={fill || defaultColor}
      d="M2.72111981,31.1490825 L13.3733024,40.202292 L23.8938717,31.0980241 C23.5408855,31.0908571 23.0785606,31.0993441 22.4429868,31.1206281 C21.8101117,31.14182 21.5219476,31.1490825 21.1667244,31.1490825 L19.1667244,31.1490825 L19.1667244,15 L7.19522871,15 L7.19522871,31.1490825 L2.72111981,31.1490825 Z M24.6853551,30.4165564 C24.6832405,30.4182049 24.6811202,30.4199462 24.6789973,30.4217798 L24.6853551,30.4165564 Z M13.2391587,40.318377 L13.2503329,40.3087071 C13.2462782,40.3117252 13.2425456,40.3149539 13.2391587,40.318377 Z M1.66998866,27.1490825 L3.19522871,27.1490825 L3.19522871,14.6109106 C3.19522871,12.6052938 4.85523392,11 6.84993322,11 L19.4760481,11 C21.494844,11 23.1667244,12.5930015 23.1667244,14.6109106 L23.1667244,27.0990943 C24.3588668,27.0759305 24.9926934,27.1206626 25.7395695,27.3072167 C27.428905,27.7291774 28.5625,28.930295 28.5625,30.7599931 C28.5625,31.8532721 28.0374306,32.8536231 27.1917072,33.533949 L15.9275502,43.2786776 C14.5760088,44.5664536 12.4163828,44.634291 10.9864792,43.4232285 L-0.632279188,33.5485373 C-3.34332667,31.4281217 -1.77073661,27.1490825 1.66998866,27.1490825 Z"
      scale={scale}
    />
    <Path
      fill={fill || defaultColor}
      d="M72.611,16.666 C72.611,16.666 69.716,16.071 67.01,20.238 C67.01,20.238 65.035,16.282 60.922,16.637 C60.922,16.637 55.97,17.586 56.322,23.024 C56.322,23.024 56.262,24.603 57.675,26.017 L63.195,32.008 L65.937,34.859 C65.937,34.859 66.928,36.122 68.12,34.859 L75.752,26.542 C75.752,26.542 78.16,24.839 77.618,21.132 C77.618,21.131 76.833,16.909 72.611,16.666 Z"
      scale={scale}
    />
  </Svg>
);
