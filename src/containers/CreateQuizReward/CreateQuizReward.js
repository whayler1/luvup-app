import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import _ from 'lodash';

import CreateQuizNavBar from '../CreateQuizNavBar';
import CreateQuizLuvupButton from './CreateQuizLuvupButton';
import { QuizItemAttemptType } from '../../types';
import { quiz, forms } from '../../styles';
import Button from '../../components/Button';

class CreateQuizReward extends PureComponent {
  static propTypes = {
    quizItem: QuizItemAttemptType,
    loverFirstName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      reward: props.quizItem.reward || 3,
    };
  }

  handleRewardPress = reward => {
    this.setState({ reward, isMaxChoicesLengthError: false });
  };

  handleNextPress = () => {
    Actions.createQuizReview({
      quizItem: {
        ...this.props.quizItem,
        reward: this.state.reward,
      },
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        <CreateQuizNavBar
          onNextPress={this.handleNextPress}
          nextText="Review"
        />
        <ScrollView
          style={quiz.scrollContainer}
          contentContainerStyle={quiz.scrollContent}>
          <Text style={quiz.questionSmallText}>
            {this.props.quizItem.question}
          </Text>
          <View style={quiz.rewardContainer}>
            <Text style={forms.label}>Reward</Text>
            <Text style={forms.description}>
              How many Luvups does {this.props.loverFirstName} win if they
              answer this right?
            </Text>
            <View style={quiz.luvupUiContainer}>
              {_.times(5, i => (
                <CreateQuizLuvupButton
                  key={i}
                  index={i}
                  currentReward={this.state.reward}
                  reward={i + 1}
                  onPress={this.handleRewardPress}
                />
              ))}
            </View>
          </View>
          <View style={quiz.createRewardSubmitContainer}>
            <Button
              testID="create-quiz-review-button"
              onPress={this.handleNextPress}
              title="Review"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(state => ({
  loverFirstName: state.lover.firstName,
}))(CreateQuizReward);
