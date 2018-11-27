import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { format } from 'date-fns';

import QuizDisplay from '../../components/QuizDisplay';
import { quiz as styles, buttons, forms } from '../../styles';
import { answerQuizItem as answerQuizItemAction } from '../../redux/quizItem/quizItem.actions';

const NO_CHOICE_SELECTED = 'no-choice-selected';

class ViewQuiz extends PureComponent {
  static propTypes = {
    quizItemId: PropTypes.string.isRequired,
    quizItemDictionary: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    loverFirstName: PropTypes.string.isRequired,
    answerQuizItem: PropTypes.func.isRequired,
    isAnswerQuizItemInFlight: PropTypes.bool.isRequired,
    answerQuizItemErrorMessage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.quizItem = props.quizItemDictionary[props.quizItemId];
    this.isSender = this.quizItem.senderId === props.userId;
    this.isAnswerable = !this.quizItem.recipientChoiceId && !this.isSender;
    const createdAtDate = new Date(this.quizItem.createdAt);
    this.formattedCreatedAt =
      format(createdAtDate, 'MMM Do YYYY') +
      ' at ' +
      format(createdAtDate, 'h:mma');

    this.state = {
      recipientChoiceId: this.quizItem.recipientChoiceId,
      error: '',
    };
  }

  handleChoicePress = recipientChoiceId => {
    this.setState({ recipientChoiceId });
  };

  handleSubmit = () => {
    const {
      state: { recipientChoiceId },
      props: { quizItemId, answerQuizItem },
    } = this;
    if (!recipientChoiceId) {
      this.setState({ error: NO_CHOICE_SELECTED });
    } else {
      this.setState({ error: '' });
      answerQuizItem(quizItemId, recipientChoiceId);
    }
  };

  render() {
    const {
      quizItem,
      isSender,
      isAnswerable,
      handleChoicePress,
      handleSubmit,
      formattedCreatedAt,
      state: { recipientChoiceId, error },
      props: { isAnswerQuizItemInFlight, answerQuizItemErrorMessage },
    } = this;
    const loverFirstName = _.upperFirst(this.props.loverFirstName);
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.viewQuizDetails}>
          {isSender ? (
            <Text style={styles.viewQuizDetailsBold}>
              You sent {loverFirstName} a quiz
            </Text>
          ) : (
            <Text style={styles.viewQuizDetailsBold}>
              {loverFirstName} sent you a quiz
            </Text>
          )}
          <Text style={styles.viewQuizDetailsNewLine}>
            {'\n'}
            {formattedCreatedAt}.
          </Text>
        </Text>
        {isAnswerable && (
          <Text style={styles.viewQuizDetailsDirections}>
            Select an answer below to win {quizItem.reward} Luvups!
          </Text>
        )}
        <View style={styles.viewQuizHorizontalRuleWrapper}>
          <View style={styles.viewQuizHorizontalRule} />
        </View>
        <QuizDisplay
          onChoicePress={handleChoicePress}
          isAnswerable={isAnswerable}
          quizItem={quizItem}
          recipientChoiceId={recipientChoiceId}
        />
        {isAnswerable && (
          <View style={styles.viewQuizSubmitWrapper}>
            {error === NO_CHOICE_SELECTED && (
              <Text style={[forms.error, styles.viewQuizSubmitError]}>
                Please select a choice
              </Text>
            )}
            {answerQuizItemErrorMessage && (
              <Text style={[forms.error, styles.viewQuizSubmitError]}>
                {answerQuizItemErrorMessage}
              </Text>
            )}
            <Button
              onPress={handleSubmit}
              containerViewStyle={buttons.infoContainer}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              disabled={isAnswerQuizItemInFlight}
              title={isAnswerQuizItemInFlight ? 'Submitting…' : 'Submit'}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    quizItemDictionary: state.quizItem.quizItemDictionary,
    userId: state.user.id,
    loverFirstName: state.lover.firstName,
    isAnswerQuizItemInFlight: state.quizItem.isAnswerQuizItemInFlight,
    answerQuizItemErrorMessage: state.quizItem.answerQuizItemErrorMessage,
  }),
  {
    answerQuizItem: answerQuizItemAction,
  }
)(ViewQuiz);
