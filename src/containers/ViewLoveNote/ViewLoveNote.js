import React, { PureComponent, Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Quotes from '../../components/Art/Quotes';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import { vars, buttons } from '../../styles';
import { setLoveNoteRead as setLoveNoteReadAction } from '../../redux/loveNote/loveNote.actions';

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
    setLoveNoteRead: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { loveNotes, userId } = props;

    this.loveNote = loveNotes.find(
      loveNote => loveNote.id === props.loveNoteId
    );
    if (!this.loveNote.isRead) {
      props.setLoveNoteRead(props.loveNoteId);
    }
    const createdAtDate = new Date(this.loveNote.createdAt);
    this.formattedCreatedAt =
      format(createdAtDate, 'MMM Do YYYY') +
      ' at ' +
      format(createdAtDate, 'h:mma');
    this.isSender = userId === this.loveNote.senderId;
  }

  handleWriteLoveNotePress = () => {
    Actions.createLoveNote();
  };

  render() {
    const {
      isSender,
      loveNote: { numLuvups, numJalapenos },
    } = this;
    const isTokens = numLuvups > 0 || numJalapenos > 0;
    return (
      <ScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 60,
          paddingHorizontal: 8,
        }}>
        <Text
          style={{
            fontFamily: vars.fontRegular,
            fontSize: 14,
            color: vars.blueGrey700,
            textAlign: 'center',
            zIndex: 10,
            paddingTop: 12,
          }}>
          {isSender ? (
            <Fragment>
              <Text style={{ fontFamily: vars.fontBlack }}>
                You sent {this.props.loverFirstName} a love note
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={{ fontFamily: vars.fontBlack }}>
                {this.props.loverFirstName} sent you a love note
              </Text>
            </Fragment>
          )}
          <Text style={{ paddingTop: 10 }}>
            {'\n'}
            {this.formattedCreatedAt}.
          </Text>
        </Text>
        <View
          style={{
            alignItems: 'center',
            marginTop: -46,
          }}>
          <Quotes scale={0.8} fill={vars.blueGrey50} />
        </View>
        <Text
          style={{
            paddingTop: 8,
            textAlign: 'center',
            fontSize: 30,
            fontFamily: vars.fontRegular,
            color: vars.blueGrey500,
          }}>
          {decodeURI(this.loveNote.note)}
        </Text>
        {isTokens && (
          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {_.isNumber(numLuvups) &&
              numLuvups > 0 && (
                <View style={{ paddingHorizontal: 16 }}>
                  <CoinArt recentlySentCoinCount={numLuvups} />
                </View>
              )}
            {_.isNumber(numJalapenos) &&
              numJalapenos > 0 && (
                <View style={{ paddingHorizontal: 16 }}>
                  <JalapenoArt
                    scale={0.8}
                    recentlySentJalapenoCount={numJalapenos}
                  />
                </View>
              )}
          </View>
        )}
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity onPress={this.handleWriteLoveNotePress}>
            <Text style={buttons.secondarySkeletonText}>
              {isSender ? 'Write Another Love Note' : 'Write a New Love Note'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    loveNotes: state.loveNote.loveNotes,
    userId: state.user.id,
    loverFirstName: state.lover.firstName,
  }),
  {
    setLoveNoteRead: setLoveNoteReadAction,
  }
)(ViewLoveNote);
