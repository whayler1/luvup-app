import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { scene } from '../../styles';
import { resendLoverRequestEmail as resendLoverRequestEmailAction } from '../../redux/loverRequest/loverRequest.actions';

class ResendLoverRequest extends PureComponent {
  static propTypes = {
    loverEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverRequestId: PropTypes.string.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSent: false,
      email: props.loverEmail || '',
    };
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handleSubmit = () => {
    const {
      props: { resendLoverRequestEmail, loverRequestId },
    } = this;
    resendLoverRequestEmail(loverRequestId);
  };

  render() {
    const {
      props: { loverFirstName },
      state: { email },
      handleEmailChange,
      handleSubmit,
    } = this;
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <View style={scene.content}>
          <View style={scene.contentTop}>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Resend Lover Request
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Send {loverFirstName} another Lover Request
            </Text>
            <Input
              label="Email"
              onChangeText={handleEmailChange}
              value={email}
              placeholder="jane.doe@email.com"
              error=""
              inputProps={{
                autoCapitalize: 'none',
                editable: true,
                spellCheck: false,
                keyboardType: 'email-address',
                returnKeyType: 'go',
                onSubmitEditing: handleSubmit,
                testID: 'resend-lover-request-email-input',
              }}
            />
            <View style={scene.gutterAndHalfTop}>
              <Button title="Resend Lover Request" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => (
    {
      loverEmail: state.lover.email,
      loverFirstName: state.lover.firstName,
      loverRequestId: state.loverRequest.id,
    },
    {
      resendLoverRequestEmail: resendLoverRequestEmailAction,
    }
  )
)(ResendLoverRequest);
