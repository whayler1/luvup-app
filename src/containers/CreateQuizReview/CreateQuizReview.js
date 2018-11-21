import React, { PureComponent, Fragment } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemType } from '../../types';
import { quiz, buttons } from '../../styles';
import { createQuizItem as createQuizItemAction } from '../../redux/quizItem/quizItem.actions';
import CreateQuizChoice from '../CreateQuizChoices/CreateQuizChoice';

class CreateQuizReview extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
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
    const {
      quizItem: { question, choices, senderChoiceIndex, reward },
      isCreateQuizItemInFlight,
    } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        {this.state.isSuccess ? (
          <View>
            <Text>Success!</Text>
            <Button
              onPress={this.handleDone}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title="Done"
            />
          </View>
        ) : (
          <Fragment>
            <CreateQuizNavBar
              onNextPress={this.handleSubmit}
              nextText={isCreateQuizItemInFlight ? 'Submitting…' : 'submit'}
              isDisabled={isCreateQuizItemInFlight}
            />
            <ScrollView
              style={quiz.scrollContainer}
              contentContainerStyle={quiz.scrollContent}>
              <Text style={quiz.questionSmallText}>{question}</Text>
              {choices.map((choice, i) => (
                <CreateQuizChoice
                  key={i}
                  isChecked={i === senderChoiceIndex}
                  value={choice}
                  index={i}
                  isReadOnly
                />
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
          </Fragment>
        )}
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
