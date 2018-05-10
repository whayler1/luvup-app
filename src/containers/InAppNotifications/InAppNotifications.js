import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Template from './InAppNotifications.template';

class InAppNotifications extends PureComponent {
  render() {
    return (
      <Template
        children={this.props.children}
      />
    )
  }
};

export default connect()(InAppNotifications);
