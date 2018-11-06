import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CoinArt from '../../components/CoinArt';
import styles from './CreateQuiz.styles';
import { vars } from '../../styles';
import { TouchableOpacity } from 'react-native';

class CreateQuizLuvupButton extends PureComponent {
  static propTypes = {
    currentReward: PropTypes.number.isRequired,
    reward: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.reward);
  };

  render() {
    const isActive = this.props.reward <= this.props.currentReward;
    const coinFill = isActive ? vars.blueGrey300 : vars.blueGrey50;
    const coinStroke = isActive ? vars.blueGrey500 : vars.blueGrey100;
    return (
      <TouchableOpacity style={styles.luvupUiItem} onPress={this.handlePress}>
        <CoinArt fill={coinFill} stroke={coinStroke} scale={0.7} />
      </TouchableOpacity>
    );
  }
}

export default CreateQuizLuvupButton;
