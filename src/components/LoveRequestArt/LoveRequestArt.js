import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { Svg, Path } from 'react-native-svg';
/* eslint-enable import/no-extraneous-dependencies */

import { vars } from '../../styles';

const defaultColor = vars.blueGrey100;

export default ({ fill = defaultColor, scale = 1 }) => (
  <Svg width={548 * scale} height={513 * scale}>
    <Path
      d="M411.9,0.7 C343.4,0.7 279.1,39.2 275.4,117.6 L285.8,117.6 C329.3,117.6 369,145.1 370.3,191.7 C370.9,224.7 345.8,251.7 319.5,268.8 C273,302.5 264.4,322.7 271.1,348.4 L265.6,348.4 C261.9,333.7 252.1,299.4 252.1,284.8 C252.1,258.5 271.1,230.9 290.1,212.6 C309.1,193.6 327.4,179.5 327.4,163.6 C327.4,137.3 303.5,127.5 280.9,127.5 C269.9,127.5 242.9,132.4 240.5,146.5 C239.9,149.6 250.9,149.6 259.5,158.7 C264.4,164.2 267.5,172.2 267.5,180.1 C267.5,198.5 253.4,206.4 236.9,206.4 C219.1,206.4 207.5,192.9 207.5,175.8 C207.5,158 219.7,142.1 233.8,132.3 C248.5,122.5 259.5,119.5 274.2,118.2 C270.5,39.9 206.3,1.3 137.7,1.3 C62.4,1.3 0.6,63.7 0.6,147 C0.6,348.3 212.4,372.2 271.7,511.1 C272.3,512.9 275.4,512.9 276.6,511.1 C336,372.2 547.7,348.9 547.7,147 C548.3,63.1 487.1,0.7 411.9,0.7 Z M275.4,430.9 C258.3,430.9 244.2,416.2 244.2,399.7 C244.2,383.2 258.9,368.5 275.4,368.5 C291.9,368.5 306.6,382.6 306.6,399.7 C307.2,417.5 292.5,430.9 275.4,430.9 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
  </Svg>
);
