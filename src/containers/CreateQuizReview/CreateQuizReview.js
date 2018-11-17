import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemType } from '../../types';
import { quiz, buttons } from '../../styles';
import { createQuizItem as createQuizItemAction } from '../../redux/quizItem/quizItem.actions';

class CreateQuizReview extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
    createQuizItem: PropTypes.func.isRequired,
    isCreateQuizItemInFlight: PropTypes.bool.isRequired,
    createQuizItemErrorMessage: PropTypes.string.isRequired,
  };

  handleSubmit = () => {
    const {
      question,
      reward,
      choices,
      senderChoiceIndex,
    } = this.props.quizItem;
    this.props.createQuizItem(question, reward, choices, senderChoiceIndex);
  };

  render() {
    const {
      quizItem: { question, choices, senderChoiceIndex, reward },
      isCreateQuizItemInFlight,
    } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        <CreateQuizNavBar
          onNextPress={this.handleSubmit}
          nextText={isCreateQuizItemInFlight ? 'Submitting…' : 'submit'}
          isDisabled={isCreateQuizItemInFlight}
        />
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
          {this.props.createQuizItemErrorMessage && (
            <Text>{this.props.createQuizItemErrorMessage}</Text>
          )}
          <Button
            onPress={this.handleSubmit}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={
              this.props.isCreateQuizItemInFlight
                ? 'Creating Quiz…'
                : 'Create Quiz'
            }
            disabled={this.props.isCreateQuizItemInFlight}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    isCreateQuizItemInFlight: state.quizItem.isCreateQuizItemInFlight,
    createQuizItemErrorMessage: state.quizItem.createQuizItemErrorMessage,
  }),
  {
    createQuizItem: createQuizItemAction,
  }
)(CreateQuizReview);
