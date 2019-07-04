import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { scene, forms } from '../../styles';

class CreateInviteForm extends PureComponent {
  static propTypes = {
    recipientEmail: PropTypes.string,
    recipientFirstName: PropTypes.string,
    recipientLastName: PropTypes.string,
    recipientEmailError: PropTypes.string,
    recipientFirstNameError: PropTypes.string,
    recipientLastNameError: PropTypes.string,
    onEmailChange: PropTypes.func,
    onFirstNameChange: PropTypes.func,
    onLastNameChange: PropTypes.func,
    isInFlight: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  setFirstNameRef = el => {
    this.firstNameEl = el;
  };

  setLastNameRef = el => {
    this.lastNameEl = el;
  };

  handleEmailNext = () => {
    this.firstNameEl.focus();
  };

  handleFirstNameNext = () => {
    this.lastNameEl.focus();
  };

  render() {
    const {
      props: {
        recipientEmail,
        recipientFirstName,
        recipientLastName,
        recipientEmailError,
        recipientFirstNameError,
        recipientLastNameError,
        onEmailChange,
        onFirstNameChange,
        onLastNameChange,
        onSubmit,
        isInFlight,
      },
      setFirstNameRef,
      setLastNameRef,
      handleEmailNext,
      handleFirstNameNext,
    } = this;
    return (
      <View>
        <Input
          label="Email"
          value={recipientEmail}
          placeholder="my@lover.com"
          onChangeText={onEmailChange}
          error={recipientEmailError}
          inputProps={{
            autoCapitalize: 'none',
            testID: 'create-invite-recipient-email',
            editable: !isInFlight,
            spellCheck: false,
            keyboardType: 'email-address',
            returnKeyType: 'next',
            onSubmitEditing: handleEmailNext,
          }}
        />
        <View style={forms.row}>
          <View style={forms.buttonCell2ColLeft}>
            <Input
              label="First Name"
              value={recipientFirstName}
              onChangeText={onFirstNameChange}
              error={recipientFirstNameError}
              maxLength={20}
              inputProps={{
                testID: 'create-invite-recipient-first-name',
                editable: !isInFlight,
                spellCheck: false,
                ref: setFirstNameRef,
                returnKeyType: 'next',
                onSubmitEditing: handleFirstNameNext,
              }}
            />
          </View>
          <View style={forms.buttonCell2ColRight}>
            <Input
              label="Last Name"
              value={recipientLastName}
              onChangeText={onLastNameChange}
              error={recipientLastNameError}
              maxLength={20}
              inputProps={{
                testID: 'create-invite-recipient-last-name',
                editable: !isInFlight,
                spellCheck: false,
                ref: setLastNameRef,
                returnKeyType: 'go',
                onSubmitEditing: onSubmit,
              }}
            />
          </View>
        </View>
        <View style={scene.gutterDoubleAndHalfTop}>
          <Button
            title="Send Invite"
            isInFlight={isInFlight}
            onPress={onSubmit}
            testID="create-invite-submit"
          />
        </View>
      </View>
    );
  }
}

export default CreateInviteForm;
