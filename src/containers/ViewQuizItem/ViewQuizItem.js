import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ViewQuizItem extends PureComponent {
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
    } = this;
    return (
      <View>
        <Text>View Quiz Item {recipientChoiceId}</Text>
      </View>
    );
  }
}

export default connect(state => ({
  quizItemDictionary: state.quizItem.quizItemDictionary,
  userId: state.user.id,
  loverId: state.lover.id,
}))(ViewQuizItem);
