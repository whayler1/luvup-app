import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { Svg, Path } from 'react-native-svg';
/* eslint-enable import/no-extraneous-dependencies */

import { vars } from '../../../styles';

const defaultColor = vars.blueGrey500;

const SearchArt = ({ fill, scale = 1 }) => {
  const props = { fill: fill || defaultColor, scale };
  return (
    <Svg width={22 * scale} height={21 * scale}>
      <Path
        {...props}
        d="M16.4561852,14.0419716 L21.2071068,18.7928932 C21.5976311,19.1834175 21.5976311,19.8165825 21.2071068,20.2071068 C20.8165825,20.5976311 20.1834175,20.5976311 19.7928932,20.2071068 L15.1535043,15.5677179 C13.5440879,17.0762412 11.3799216,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,10.8682826 17.4307299,12.603605 16.4561852,14.0419716 Z M9,16 C12.8659932,16 16,12.8659932 16,9 C16,5.1340068 12.8659932,2 9,2 C5.13400675,2 2,5.1340068 2,9 C2,12.8659932 5.13400675,16 9,16 Z"
      />
    </Svg>
  );
};

export default SearchArt;
