import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

import { quiz as styles, buttons } from '../../styles';
import CoinRow from '../../components/CoinRow';

const handleDone = () => Actions.dashboard();

const ViewQuizSuccess = ({ reward }) => (
  <View style={styles.successContainer}>
    <View style={styles.successWrapper}>
      <CoinRow reward={reward} />
      <Text style={styles.successText}>Correct! You win {reward} Luvups</Text>
      <Button
        onPress={handleDone}
        containerViewStyle={buttons.container}
        buttonStyle={buttons.infoSkeletonButton}
        textStyle={buttons.infoSkeletonText}
        title="Done"
      />
    </View>
  </View>
);

ViewQuizSuccess.propTypes = {
  reward: PropTypes.number.isRequired,
};

export default ViewQuizSuccess;
