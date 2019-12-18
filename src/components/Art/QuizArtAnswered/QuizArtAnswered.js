import React from 'react';
import { Svg, Path, Rect, Polygon, G } from 'react-native-svg';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const QuizArtAnswered = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={116 * scale} height={60 * scale}>
      <G {...props} fillRule="nonzero">
        <Path d="M61.6 25.7H47.2V11.3h14.4v14.4zm-12.2-2.1h10.1V13.5H49.4v10.1zM70 17.5h30.7v2.1H70zM70 12h30.7v2.1H70zM70 22.9h30.7V25H70z" />
        <G>
          <Path d="M59.5 46.5H49.4V36.4h8.5l2.1-2.1H47.2v14.4h14.4v-6.9L59.5 44z" />
          <Path d="M56 45.4L50.5 40l2.6-2.5 2.9 2.9 7.6-7.6 2.5 2.5zM70 40.4h30.7v2.1H70zM70 34.9h30.7V37H70zM70 45.9h30.7V48H70z" />
        </G>
        <Path d="M110.125 6.8a1.65 1.65 0 00-1.625-1.625H39.6A1.65 1.65 0 0037.975 6.8v46.4a1.65 1.65 0 001.625 1.625h68.8a1.65 1.65 0 001.625-1.625v-2.575l.1-43.825zM108.4 59.975H39.6c-3.722 0-6.775-3.053-6.775-6.775V6.8c0-3.722 3.053-6.775 6.775-6.775h68.9c3.722 0 6.775 3.053 6.775 6.775v48.975h-.612c-1.02 2.458-3.45 4.2-6.263 4.2zM10.51 45.95c-.683 0-1.365-.273-1.911-.683l-7.574-6.482C-.204 37.76-.34 35.919.683 34.69c1.024-1.229 2.866-1.365 4.095-.342l5.322 4.572 10.781-12.896c1.024-1.229 2.866-1.365 4.094-.342 1.229 1.024 1.365 2.866.342 4.095L12.693 44.926c-.478.614-1.228.955-1.979 1.024h-.205z" />
      </G>
    </Svg>
  );
};

export default QuizArtAnswered;
