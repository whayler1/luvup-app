import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import QuizDisplay from '../../components/QuizDisplay';
import { quiz as styles } from '../../styles';

class ViewQuiz extends PureComponent {
  static propTypes = {
    quizItemId: PropTypes.string.isRequired,
    quizItemDictionary: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    loverFirstName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.quizItem = props.quizItemDictionary[props.quizItemId];
    this.isSender = this.quizItem.senderId === props.userId;

    this.state = {
      recipientChoiceId: this.quizItem.recipientChoiceId,
    };
  }

  render() {
    const {
      quizItem,
      isSender,
      // state: { recipientChoiceId },
    } = this;
    const loverFirstName = _.upperFirst(this.props.loverFirstName);
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        {isSender ? (
          <Text>You sent {loverFirstName} a quiz</Text>
        ) : (
          <Text>{loverFirstName} sent you a quiz</Text>
        )}
        <QuizDisplay quizItem={quizItem} />
      </ScrollView>
    );
  }
}

export default connect(state => ({
  quizItemDictionary: state.quizItem.quizItemDictionary,
  userId: state.user.id,
  loverFirstName: state.lover.firstName,
}))(ViewQuiz);
