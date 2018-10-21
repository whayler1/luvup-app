import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quotes from '../../components/Art/Quotes';
import { vars } from '../../styles';

class ViewLoveNote extends PureComponent {
  static propTypes = {
    loveNoteId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loverFirstName: PropTypes.string.isRequired,
    loveNotes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
      })
    ),
  };

  constructor(props) {
    super(props);
    const { loveNotes, userId } = props;

    this.loveNote = loveNotes.find(
      loveNote => loveNote.id === props.loveNoteId
    );
    this.isSender = userId === this.loveNote.senderId;
  }

  render() {
    return (
      <View>
        {this.isSender ? (
          <Text>
            You sent {this.props.loverFirstName} a love note on{' '}
            {this.loveNote.createdAt}.
          </Text>
        ) : (
          <Text>
            {this.props.loverFirstName} sent you a love note on{' '}
            {this.loveNote.createdAt}.
          </Text>
        )}
        <View
          style={{
            alignItems: 'center',
            paddingTop: 16,
          }}>
          <Quotes fill={vars.blueGrey100} />
        </View>
        <Text
          style={{
            marginTop: -20,
            textAlign: 'center',
            fontSize: 20,
            fontFamily: vars.fontRegular,
          }}>
          {decodeURI(this.loveNote.note)}
        </Text>
      </View>
    );
  }
}

export default connect(state => ({
  loveNotes: state.loveNote.loveNotes,
  userId: state.user.id,
  loverFirstName: state.lover.firstName,
}))(ViewLoveNote);
