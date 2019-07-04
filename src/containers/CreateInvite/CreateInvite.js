import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { scene } from '../../styles';
import CreateInviteForm from './CreateInviteForm';
import SimpleHeader from '../../components/SimpleHeader';

class CreateInvite extends PureComponent {
  static propTypes = {
    isCreateRelationshipWithInviteInFlight: PropTypes.bool,
    createRelationshipWithInviteError: PropTypes.bool,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    recipientEmail: PropTypes.string,
    recipientFirstName: PropTypes.string,
    recipientLastName: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      recipientEmail: props.recipientEmail || '',
      recipientFirstName: props.recipientFirstName || '',
      recipientLastName: props.recipientLastName || '',
      recipientEmailError: '',
      recipientFirstNameError: '',
      recipientLastNameError: '',
    };
  }

  handleEmailChange = recipientEmail => {
    this.setState({ recipientEmail });
  };

  handleFirstNameChange = recipientFirstName => {
    this.setState({ recipientFirstName });
  };
  handleLastNameChange = recipientLastName => {
    this.setState({ recipientLastName });
  };

  handleSumbit = () => {
    //
  };

  render() {
    const {
      props: {
        isCreateRelationshipWithInviteInFlight,
        userFirstName,
        userLastName,
      },
      state: {
        recipientEmail,
        recipientFirstName,
        recipientLastName,
        recipientEmailError,
        recipientFirstNameError,
        recipientLastNameError,
      },
      handleEmailChange,
      handleFirstNameChange,
      handleLastNameChange,
      handleSubmit,
    } = this;
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <KeyboardAvoidingView style={scene.container} behavior="height">
          <SimpleHeader {...{ userFirstName, userLastName }} />
          <View style={scene.contentNoTop}>
            <View style={scene.contentTop}>
              <Text style={[scene.titleCopy, scene.textCenter]}>
                Invite Lover
              </Text>
              <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
                Send your lover an invtie to be in a relationship on Luvup.
              </Text>
              <CreateInviteForm
                {...{
                  recipientEmail,
                  recipientFirstName,
                  recipientLastName,
                  recipientEmailError,
                  recipientFirstNameError,
                  recipientLastNameError,
                  onEmailChange: handleEmailChange,
                  onFirstNameChange: handleFirstNameChange,
                  onLastNameChange: handleLastNameChange,
                  isInFlight: isCreateRelationshipWithInviteInFlight,
                  onSubmit: handleSubmit,
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  userFirstName: state.user.firstName,
  userLastName: state.user.lastName,
}))(CreateInvite);
