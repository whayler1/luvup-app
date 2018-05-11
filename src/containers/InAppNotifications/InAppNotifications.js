import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Template from './InAppNotifications.template';



class InAppNotifications extends PureComponent {
  state = {
    notifications: [],
    luvupReceivedNotifications: [],
    jalapenoReceivedNotifications: [],
  }

  componentDidMount() {

  }

  render() {
    return (
      <Template
        isReady={this.props.isFontLoaded}
      />
    )
  }
};

// export default InAppNotifications;

export default connect(
  state => ({
    isFontLoaded: state.font.isFontLoaded
  }),
)(InAppNotifications);
