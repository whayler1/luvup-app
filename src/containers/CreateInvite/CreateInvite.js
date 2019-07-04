import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, View, Text } from 'react-native';

import { scene } from '../../styles';
import CreateInviteForm from './CreateInviteForm';

class CreateInvite extends PureComponent {
  static propTypes = {
    isCreateRelationshipWithInviteInFlight: PropTypes.bool,
    createRelationshipWithInviteError: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      recipientEmail: '',
      recipientFirstName: '',
      recipientLastName: '',
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
      props: { isCreateRelationshipWithInviteInFlight },
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
      <KeyboardAvoidingView style={scene.container} behavior="height">
        <View style={scene.contentNoTop}>
          <View style={scene.contentTop}>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Invite Lover
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Use the form below to invite your lover to a relationship on
              Luvup.
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
    );
  }
}

export default CreateInvite;
