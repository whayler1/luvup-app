import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemType } from '../../types';
import { quiz } from '../../styles';

class CreateQuizReview extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
  };

  handleSubmit = () => {
    // meow
  };

  render() {
    const {
      question,
      choices,
      senderChoiceIndex,
      reward,
    } = this.props.quizItem;

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        <CreateQuizNavBar onNextPress={this.handleSubmit} nextText="Submit" />
        <ScrollView
          style={quiz.scrollContainer}
          contentContainerStyle={quiz.scrollContent}>
          <Text>{question}</Text>
          {choices.map((choice, i) => (
            <Text key={i}>
              {i === senderChoiceIndex ? '☑️' : ''}
              {choice}
            </Text>
          ))}
          <Text>{reward}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizReview;
