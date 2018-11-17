import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemType } from '../../types';
import { quiz } from '../../styles';

class CreateQuizReward extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
  };

  constructor(props) {
    super(props);

    this.state = {
      reward: props.quizItem.reward || 3,
    };
  }

  handleNextPress = () => {
    // Actions.createQuizReview({ quizItem: this.props.quizItem });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        <CreateQuizNavBar onNextPress={this.handleNextPress} />
        <ScrollView
          style={quiz.scrollContainer}
          contentContainerStyle={quiz.scrollContent}>
          <Text>{this.props.quizItem.question}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizReward;
