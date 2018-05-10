import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Template from './InAppNotifications.template';

class InAppNotifications extends PureComponent {
  render() {
    return (
      <Template
        children={this.props.children}
        isFontLoaded={this.props.isFontLoaded}
      />
    )
  }
};

export default connect(
  state => ({
    isFontLoaded: state.font.isFontLoaded
  }),
)(InAppNotifications);
