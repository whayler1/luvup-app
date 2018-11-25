import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import QuizDisplay from '../../components/QuizDisplay';
import { quiz as styles } from '../../styles';

class ViewQuiz extends PureComponent {
  static propTypes = {
    quizItemId: PropTypes.string.isRequired,
    quizItemDictionary: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.quizItem = props.quizItemDictionary[props.quizItemId];

    this.state = {
      recipientChoiceId: this.quizItem.recipientChoiceId,
    };
  }

  render() {
    const {
      state: { recipientChoiceId },
      quizItem,
    } = this;
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <QuizDisplay quizItem={quizItem} />
      </ScrollView>
    );
  }
}

export default connect(state => ({
  quizItemDictionary: state.quizItem.quizItemDictionary,
  userId: state.user.id,
  loverId: state.lover.id,
}))(ViewQuiz);
