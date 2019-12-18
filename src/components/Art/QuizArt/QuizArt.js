import React from 'react';
import { Svg, Path, Rect, Polygon, G } from 'react-native-svg';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const QuizArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={84 * scale} height={60 * scale} {...props}>
      <G fill="#000" fillRule="nonzero">
        <Path
          {...props}
          d="M29.6 25.7H15.2V11.3h14.4v14.4zm-12.2-2.1h10.1V13.5H17.4v10.1zM38 17.5h30.7v2.1H38zM38 12h30.7v2.1H38zM38 22.9h30.7V25H38z"
        />
        <G>
          <Path
            {...props}
            d="M27.5 46.5H17.4V36.4h8.5l2.1-2.1H15.2v14.4h14.4v-6.9L27.5 44z"
          />
          <Path
            {...props}
            d="M24 45.4L18.5 40l2.6-2.5 2.9 2.9 7.6-7.6 2.5 2.5zM38 40.4h30.7v2.1H38zM38 34.9h30.7V37H38zM38 45.9h30.7V48H38z"
          />
        </G>
        <Path
          {...props}
          d="M78.125 6.8A1.65 1.65 0 0076.5 5.175H7.6A1.65 1.65 0 005.975 6.8v46.4A1.65 1.65 0 007.6 54.825h68.8a1.65 1.65 0 001.625-1.625v-2.575l.1-43.825zM76.4 59.975H7.6c-3.722 0-6.775-3.053-6.775-6.775V6.8C.825 3.078 3.878.025 7.6.025h68.9c3.722 0 6.775 3.053 6.775 6.775v48.975h-.612c-1.02 2.458-3.45 4.2-6.263 4.2z"
        />
      </G>
    </Svg>
  );
};

export default QuizArt;
