import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CoinArt from '../../components/CoinArt';
import { vars, quiz as styles } from '../../styles';
import { TouchableOpacity } from 'react-native';

class CreateQuizLuvupButton extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    currentReward: PropTypes.number.isRequired,
    reward: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.reward);
  };

  render() {
    const { index, reward, currentReward } = this.props;
    const isActive = reward <= currentReward;
    const fill = isActive ? undefined : vars.blueGrey50;
    const stroke = isActive ? undefined : vars.blueGrey100;
    const recentlySentCoinCount = reward === currentReward ? reward : undefined;
    const coinProps = {
      fill,
      stroke,
      recentlySentCoinCount,
      scale: 0.7,
    };
    return (
      <TouchableOpacity
        testID={`create-quiz-reward-button-${index}`}
        style={styles.luvupUiItem}
        onPress={this.handlePress}>
        <CoinArt {...coinProps} />
      </TouchableOpacity>
    );
  }
}

export default CreateQuizLuvupButton;
