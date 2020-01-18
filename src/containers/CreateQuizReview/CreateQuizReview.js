import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import _ from 'lodash';

import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemAttemptType } from '../../types';
import { quiz, vars } from '../../styles';
import { createQuizItem as createQuizItemAction } from '../../redux/quizItem/quizItem.actions';
import QuizArtSent from '../../components/Art/QuizArtSent';
import QuizDisplay from '../../components/QuizDisplay';
import Well from '../../components/Well';
import Button, { BUTTON_STYLES } from '../../components/Button';
import CustomHeaderScene from '../../components/CustomHeaderScene';

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
    Actions.reset('dashboard');
  };

  renderHeader = () => (
    <CreateQuizNavBar
      onNextPress={this.handleSubmit}
      nextText={this.props.isCreateQuizItemInFlight ? 'Submitting…' : 'submit'}
      isDisabled={this.props.isCreateQuizItemInFlight}
    />
  );

  render() {
    const { quizItem } = this.props;

    if (this.state.isSuccess) {
      return (
        <View style={quiz.successContainer}>
          <View style={quiz.successWrapper}>
            <QuizArtSent />
            <View style={quiz.successTextWrapper}>
              <Text style={quiz.successText}>Quiz sent!</Text>
            </View>
            <View style={{ alignSelf: 'stretch' }}>
              <Button
                testID="create-quiz-done-button"
                onPress={this.handleDone}
                buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                title="Done"
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <CustomHeaderScene renderHeader={this.renderHeader}>
        <>
          <QuizDisplay quizItemAttempt={quizItem} />
          {_.isString(this.props.createQuizItemErrorMessage) &&
            this.props.createQuizItemErrorMessage.length > 0 && (
              <Well
                styles={{ marginBottom: vars.gutter }}
                text={this.props.createQuizItemErrorMessage}
              />
            )}
          <Button
            testID="create-quiz-submit-button"
            onPress={this.handleSubmit}
            title="Create Quiz"
            isInFlight={this.props.isCreateQuizItemInFlight}
          />
        </>
      </CustomHeaderScene>
    );
  }
}

export default connect(
  (state) => ({
    isCreateQuizItemInFlight: state.quizItem.isCreateQuizItemInFlight,
    createQuizItemErrorMessage: state.quizItem.createQuizItemErrorMessage,
  }),
  {
    createQuizItem: createQuizItemAction,
  },
)(CreateQuizReview);
