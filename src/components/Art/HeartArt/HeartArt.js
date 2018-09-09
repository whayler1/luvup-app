import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { vars } from '../../../styles';

const defaultFill = vars.blueGrey500;

const TimelineArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultFill, scale };
  console.log('fill', fill);
  return (
    <Svg width={891 * scale} height={807 * scale}>
      <Path
        {...props}
        d="M445.386719,806.233245 L445,806.617188 L445,805.849302 L68.109375,431.664062 C22.703125,386.033854 -1.0236633e-13,321.8125 -1.42108547e-14,239 C1.27495206e-13,114.78125 124.789062,2.50949378e-14 253,-3.55271368e-15 C338.218345,-1.94921149e-14 402.34725,25.9638009 445.386715,77.8914026 C488.426184,25.9638023 552.55509,-1.94921153e-14 637.773438,-3.55271368e-15 C765.984375,2.50949378e-14 890.773438,114.78125 890.773438,239 C890.773438,321.8125 868.070313,386.033854 822.664063,431.664062 L445.773438,805.849302 L445.773438,806.617188 L445.386719,806.233245 Z"
      />
    </Svg>
  );
};

TimelineArt.propTypes = {
  fill: PropTypes.string,
  scale: PropTypes.number,
};

export default TimelineArt;
