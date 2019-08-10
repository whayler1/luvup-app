import React from 'react';
import { Svg, Path, Rect, Polygon, G } from 'expo';

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const QuizArtSent = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={116 * scale} height={60 * scale}>
      <G>
        <G transform={`translate(${48 * scale}, ${11 * scale})`}>
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
          d="M111.12465,6.8 C111.12465,5.92232653 110.377673,5.17535 109.5,5.17535 L40.6,5.17535 C39.7223265,5.17535 38.97535,5.92232653 38.97535,6.8 L38.97535,53.2 C38.97535,54.0776735 39.7223265,54.82465 40.6,54.82465 L109.4,54.82465 C110.277673,54.82465 111.02465,54.0776735 111.02465,53.2 L111.02465,50.62465 L111.12465,6.8 Z M109.4,59.97535 L40.6,59.97535 C36.8776735,59.97535 33.82465,56.9223265 33.82465,53.2 L33.82465,6.8 C33.82465,3.07767347 36.8776735,0.02465 40.6,0.02465 L109.5,0.02465 C113.222326,0.02465 116.27535,3.07767347 116.27535,6.8 L116.27535,55.77535 L115.662702,55.77535 C114.642478,58.2326962 112.212257,59.97535 109.4,59.97535 Z"
        />
        <G transform={`translate(${1 * scale}, ${12 * scale})`}>
          <Polygon
            {...props}
            points="28 0 28 5 6.22222222 5 6.22222222 3.55271368e-15"
          />
          <Polygon {...props} points="28 14 28 19 0 19 0 14" />
          <Polygon
            {...props}
            points="28 28 28 33 6.22222222 33 6.22222222 28"
          />
        </G>
      </G>
    </Svg>
  );
};

export default QuizArtSent;
