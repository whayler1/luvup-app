import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View } from 'react-native';
import CoinArt from '../CoinArt';

import { quiz as styles } from '../../styles';

const CoinRow = ({ reward, coinScale = 0.5 }) => (
  <View style={styles.reviewRewardWrapper}>
    {_.times(reward, n => (
      <View style={styles.reviewRewardItem} key={n}>
        <CoinArt
          scale={coinScale}
          recentlySentCoinCount={n + 1 === reward ? reward : undefined}
        />
      </View>
    ))}
  </View>
);

CoinRow.propTypes = {
  reward: PropTypes.number,
  coinScale: PropTypes.number,
};

export default CoinRow;
