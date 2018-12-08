import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemAttemptType } from '../../types';
import { quiz, buttons } from '../../styles';
import { createQuizItem as createQuizItemAction } from '../../redux/quizItem/quizItem.actions';
import QuizArtSent from '../../components/Art/QuizArtSent';
import QuizDisplay from '../../components/QuizDisplay';

class CreateQuizReview extends PureComponent {
  static propTypes = {
    quizItem: QuizItemAttemptType,
    createQuizItem: PropTypes.func.isRequired,
    isCreateQuizItemInFlight: PropTypes.bool.isRequired,
    createQuizItemErrorMessage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isCreateQuizItemInFlight &&
      !this.props.isCreateQuizItemInFlight &&
      this.props.createQuizItemErrorMessage.length < 1
    ) {
      this.setState({ isSuccess: true }); /* eslint-disable-line */
    }
  }

  handleSubmit = () => {
    const {
      question,
      reward,
      choices,
      senderChoiceIndex,
    } = this.props.quizItem;
    this.props.createQuizItem(question, reward, choices, senderChoiceIndex);
  };

  handleDone = () => {
    Actions.dashboard();
  };

  render() {
    const { quizItem, isCreateQuizItemInFlight } = this.props;

    if (this.state.isSuccess) {
      return (
        <View style={quiz.successContainer}>
          <View style={quiz.successWrapper}>
            <QuizArtSent />
            <View style={quiz.successTextWrapper}>
              <Text style={quiz.successText}>Quiz sent!</Text>
            </View>
            <Button
              onPress={this.handleDone}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoSkeletonButton}
              textStyle={buttons.infoSkeletonText}
              title="Done"
            />
          </View>
        </View>
      );
    }

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
          <QuizDisplay quizItemAttempt={quizItem} />
          {_.isString(this.props.createQuizItemErrorMessage) &&
            this.props.createQuizItemErrorMessage.length > 0 && (
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
