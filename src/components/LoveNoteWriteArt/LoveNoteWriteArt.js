import React from 'react';
import { Svg, Path } from 'expo';

import { vars } from '../../styles';

const defaultColor = vars.blueGrey500;

export default ({ fill = defaultColor, scale = 1 }) => (
  <Svg width={103 * scale} height={52 * scale}>
    <Path
      d="M1.5,49.3 C1,49.3 0.6,49.1 0.3,48.7 C-0.2,48 2.10942375e-15,47.1 0.7,46.6 L31.1,24.6 C31.8,24.1 32.7,24.3 33.2,24.9 C33.7,25.6 33.5,26.5 32.9,27 L2.4,49 C2.2,49.2 1.8,49.3 1.5,49.3 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M81,49.3 C80.7,49.3 80.4,49.2 80.1,49 L49.6,27.2 C48.9,26.7 48.8,25.8 49.3,25.1 C49.8,24.4 50.7,24.3 51.4,24.8 L82,46.6 C82.7,47.1 82.8,48 82.3,48.7 C81.9,49.1 81.5,49.3 81,49.3 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M3.5,2.4 L80.5100021,2.4"
      stroke={fill}
      strokeWidth={3 * scale}
      scale={scale}
    />
    <Path
      d="M81.8,49.3 L1.5,49.3 C0.7,49.3 0,48.6 0,47.8 L0,2.5 C0,2 0.2,1.6 0.6,1.3 L3,3.2 L3,46.3 L80.3,46.3 L80.3,3.2 L82.8,1.3 C83.2,1.6 83.4,2 83.4,2.5 L83.4,47.8 C83.3,48.7 82.6,49.3 81.8,49.3 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M41.7,31.8 C41.4,31.8 41.1,31.7 40.8,31.5 L0.7,3.7 C1.33226763e-15,3.2 -0.1,2.3 0.3,1.6 C0.8,0.9 1.7,0.7 2.4,1.2 L41.7,28.4 L81,1.2 C81.7,0.7 82.6,0.9 83.1,1.6 C83.6,2.3 83.4,3.2 82.7,3.7 L42.5,31.6 C42.3,31.7 42,31.8 41.7,31.8 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M47.0448206,19.0481824 C47.0448206,19.0481824 44.3383761,18.4919356 41.8086218,22.3875328 C41.8086218,22.3875328 39.9622565,18.6891929 36.1171421,19.0210712 C36.1171421,19.0210712 31.4876731,19.9082614 31.8167468,24.9920766 C31.8167468,24.9920766 31.7606547,26.468234 33.081624,27.7901382 L38.2420983,33.3909356 L40.8055079,36.0562459 C40.8055079,36.0562459 41.7319626,37.2369848 42.8463259,36.0562459 L49.9812427,28.2809442 C49.9812427,28.2809442 52.2324062,26.688863 51.7257074,23.2233053 C51.7257074,23.2223704 50.9918356,19.2753554 47.0448206,19.0481824 Z"
      fill="#FFFFFF"
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M46.1396548,20.0383683 C46.1396548,20.0383683 43.984477,19.5954215 41.9699998,22.6975376 C41.9699998,22.6975376 40.4997144,19.7525001 37.4377985,20.0167793 C37.4377985,20.0167793 33.7512905,20.7232607 34.0133363,24.7715706 C34.0133363,24.7715706 33.9686694,25.9470545 35.0205749,26.9997044 L39.1299295,31.4596942 L41.1712068,33.5821163 C41.1712068,33.5821163 41.9089551,34.5223546 42.7963375,33.5821163 L48.4779669,27.3905398 C48.4779669,27.3905398 50.2705985,26.1227443 49.8671075,23.3630744 C49.8671075,23.36233 49.2827156,20.2192692 46.1396548,20.0383683 Z"
      fill={fill}
      fillRule="nonzero"
      scale={scale}
    />
    <Path
      d="M101,5.90843974 L97.2728122,9.62503893 C94.6362504,12.2616007 91.9996886,14.8981626 89.3631268,17.5347244 C87.414824,19.4830271 85.4771099,21.4207412 83.5288072,23.3690439 C83.3805668,23.5172843 83.2323264,23.6655248 83.084086,23.8137652 C82.0146372,24.883214 80.9451884,25.9526627 79.865151,27.0327001 C78.033323,28.8645282 76.2014949,30.6963563 74.3696668,32.5281844 C74.1261289,32.7717222 73.8931797,33.0046714 73.6496419,33.2482093 C73.6390533,33.2482093 73.6390533,33.2482093 73.6284647,33.2482093 C71.4154469,33.5023357 69.2024291,33.7458736 67,34 C67.2435378,31.8716911 67.4764871,29.7433821 67.7200249,27.6044846 C67.7306135,27.5197758 67.7412021,27.435067 67.7517907,27.3503581 L73.0778574,22.0242915 C76.3709125,18.7312364 79.6639676,15.4381813 82.9570227,12.1451261 C83.9205855,11.1815634 84.8841482,10.2285892 85.8371224,9.26502647 C86.3241981,8.77795079 86.8112737,8.29087512 87.2983494,7.80379944 C89.9031454,5.19900343 92.5185301,2.61538462 95.1021489,0 C95.1656805,0.0529430084 95.2080349,0.0952974151 95.2292121,0.105886017 C95.9068826,0.794145126 96.5951417,1.47181563 97.2728122,2.14948614 C98.1199003,2.99657428 98.9669885,3.84366241 99.8246652,4.70133915 C100.131735,5.0084086 100.438804,5.31547804 100.735285,5.61195889 C100.809405,5.6754905 100.904703,5.80255372 101,5.90843974 Z"
      stroke="#ffffff"
      strokeWidth={2 * scale}
      fill={fill}
      scale={scale}
    />
  </Svg>
);
