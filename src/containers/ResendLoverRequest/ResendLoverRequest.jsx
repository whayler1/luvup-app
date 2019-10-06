import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import isString from 'lodash/isString';

import Button from '../../components/Button';
import Well from '../../components/Well';
import FormScene from '../../components/FormScene';
import Form from '../../components/Form';
import { scene, vars } from '../../styles';
import { resendLoverRequestEmail as resendLoverRequestEmailAction } from '../../redux/loverRequest/loverRequest.actions';

class ResendLoverRequest extends PureComponent {
  static propTypes = {
    loverEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverRequestId: PropTypes.string.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    isResendRequestEmailInFlight: PropTypes.bool.isRequired,
    resendLoverRequestEmailError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isResendRequestEmailInFlight &&
      !this.props.isResendRequestEmailInFlight &&
      this.props.resendLoverRequestEmailError.length < 1
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState({ isSuccess: true });
    }
  }

  handleSubmit = () => {
    const {
      props: { resendLoverRequestEmail, loverRequestId, loverEmail },
    } = this;
    resendLoverRequestEmail(loverRequestId, loverEmail);
  };

  handleDone = () => {
    Actions.pop();
  };

  render() {
    const {
      props: {
        loverFirstName,
        isResendRequestEmailInFlight,
        resendLoverRequestEmailError,
      },
      state: { isSuccess },
      handleSubmit,
      handleDone,
    } = this;
    return (
      <FormScene>
        {isSuccess ? (
          <>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Lover Request Re-Sent
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              A new Lover Request has been sent to {loverFirstName} at{' '}
              {this.props.loverEmail}.
            </Text>
            <View style={scene.gutterAndHalfTop}>
              <Button title="Done" onPress={handleDone} />
            </View>
          </>
        ) : (
          <>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Resend Lover Request
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Send {loverFirstName} another Lover Request at{' '}
              <Text style={{ color: vars.blueGrey900 }}>
                {this.props.loverEmail}
              </Text>
            </Text>
            <Form
              onSubmit={handleSubmit}
              isInFlight={isResendRequestEmailInFlight}>
              {({ renderSubmit }) => (
                <>
                  {isString(resendLoverRequestEmailError) &&
                    resendLoverRequestEmailError.length > 0 && (
                      <Well
                        text={resendLoverRequestEmailError}
                        styles={scene.gutterAndHalfTop}
                      />
                    )}
                  <View style={scene.gutterAndHalfTop}>
                    {renderSubmit({
                      title: 'Resend Lover Request',
                    })}
                  </View>
                </>
              )}
            </Form>
          </>
        )}
      </FormScene>
    );
  }
}

export default connect(
  state => ({
    loverEmail: state.lover.email,
    loverFirstName: state.lover.firstName,
    loverRequestId: state.loverRequest.id,
    isResendRequestEmailInFlight:
      state.loverRequest.isResendRequestEmailInFlight,
    resendLoverRequestEmailError:
      state.loverRequest.resendLoverRequestEmailError,
  }),
  {
    resendLoverRequestEmail: resendLoverRequestEmailAction,
  }
)(ResendLoverRequest);
