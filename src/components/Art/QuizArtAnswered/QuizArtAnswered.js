import React from 'react';
import { Svg } from 'expo';

import { vars } from '../../../styles';

const { Path, Rect, Polygon, G } = Svg;
const defaultColor = vars.blueGrey500;

const QuizArtAnswered = ({ fill, scale = 1 }) => {
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
        <Path
          {...props}
          d="M10.5093701,45.9495447 C9.82700577,45.9495447 9.14464142,45.6765989 8.59874994,45.2671803 L1.02450564,38.784719 C-0.20375019,37.7611725 -0.34022306,35.9187887 0.683323467,34.6905329 C1.70686999,33.4622771 3.54925374,33.3258042 4.77750957,34.3493507 L10.0999515,38.9211919 L20.8813083,26.0245056 C21.9048548,24.7962498 23.7472385,24.6597769 24.9754944,25.6833235 C26.2037502,26.70687 26.3402231,28.5492537 25.3166765,29.7775096 L12.692936,44.9259982 C12.215281,45.5401261 11.4646802,45.8813083 10.7140794,45.9495447 C10.645843,45.9495447 10.5776066,45.9495447 10.5093701,45.9495447 Z"
        />
      </G>
    </Svg>
  );
};

export default QuizArtAnswered;