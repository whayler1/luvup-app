import React from 'react';
import { Svg, Path, Rect, Polygon, G } from 'expo';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const QuizArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={84 * scale} height={60 * scale}>
      <G transform={`translate(${3 * scale}, ${2 * scale})`}>
        <G transform={`translate(${12 * scale}, ${9 * scale})`}>
          <G>
            <Path
              {...props}
              d="M14.6,14.7 L0.2,14.7 L0.2,0.3 L14.6,0.3 L14.6,14.7 Z M2.4,12.6 L12.5,12.6 L12.5,2.5 L2.4,2.5 L2.4,12.6 Z"
            />
            <Rect {...props} x={23} y={6.5} width={30.7} height={2.1} />
            <Rect {...props} x={23} y={1} width={30.7} height={2.1} />
            <Rect {...props} x={23} y={11.9} width={30.7} height={2.1} />
          </G>
          <G transform={`translate(0, ${21 * scale})`}>
            <Polygon
              {...props}
              points="12.5 14.5 2.4 14.5 2.4 4.4 10.9 4.4 13 2.3 0.2 2.3 0.2 16.7 14.6 16.7 14.6 9.8 12.5 12"
            />
            <Polygon
              {...props}
              points="9 13.4 3.5 8 6.1 5.5 9 8.4 16.6 0.8 19.1 3.3"
            />
            <Rect {...props} x={23} y={8.4} width={30.7} height={2.1} />
            <Rect {...props} x={23} y={2.9} width={30.7} height={2.1} />
            <Rect {...props} x={23} y={13.9} width={30.7} height={2.1} />
          </G>
        </G>
        <Path
          {...props}
          d="M75.12465,4.8 C75.12465,3.92232653 74.3776735,3.17535 73.5,3.17535 L4.6,3.17535 C3.72232653,3.17535 2.97535,3.92232653 2.97535,4.8 L2.97535,51.2 C2.97535,52.0776735 3.72232653,52.82465 4.6,52.82465 L73.4,52.82465 C74.2776735,52.82465 75.02465,52.0776735 75.02465,51.2 L75.02465,48.62465 L75.12465,4.8 Z M73.4,57.97535 L4.6,57.97535 C0.87767347,57.97535 -2.17535,54.9223265 -2.17535,51.2 L-2.17535,4.8 C-2.17535,1.07767347 0.87767347,-1.97535 4.6,-1.97535 L73.5,-1.97535 C77.2223265,-1.97535 80.27535,1.07767347 80.27535,4.8 L80.27535,53.77535 L79.662702,53.77535 C78.6424777,56.2326962 76.2122566,57.97535 73.4,57.97535 Z"
        />
      </G>
    </Svg>
  );
};

export default QuizArt;
