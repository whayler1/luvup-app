import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import FormScene from '../../components/FormScene';
import { getUserInviteWithId as getUserInviteWithIdAction } from '../../redux/userInvite/userInvite.actions';

class AcceptInvite extends PureComponent {
  static propTypes = {
    userInviteId: PropTypes.string.isRequired,
    // isGetUserInviteWithIdInFlight: PropTypes.bool.isRequired,
    // getUserInviteWithIdError: PropTypes.string.isRequired,
    getUserInviteWithId: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    if (props.userInviteId) {
      props.getUserInviteWithId(props.userInviteId);
    }
  }

  render() {
    const {
      props: { userInviteId },
    } = this;
    return (
      <FormScene>
        <Text>Accept invite form! {userInviteId}</Text>
      </FormScene>
    );
  }
}

export default connect(
  state => ({
    isGetUserInviteWithIdInFlight:
      state.userInvite.isGetUserInviteWithIdInFlight,
    getUserInviteWithIdError: state.userInvite.getUserInviteWithIdError,
  }),
  {
    getUserInviteWithId: getUserInviteWithIdAction,
  }
)(AcceptInvite);
