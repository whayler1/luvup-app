import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
} from 'react-native';
import Template from './InAppNotifications.template';



class InAppNotifications extends PureComponent {
  state = {
    notifications: [],
    luvupReceivedNotifications: [],
    jalapenoReceivedNotifications: [],
  }

  translateY = new Animated.Value(-150);
  opacity = new Animated.Value(0);

  slideIn() {
    Animated.parallel([
      Animated.timing(
        this.opacity,
        {
          toValue: 1,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.linear)
        }
      ),
      Animated.timing(
        this.translateY,
        {
          toValue: 0,
          duration: 250,
          delay: 250,
          easing: Easing.inOut(Easing.quad)
        }
      ),
    ]).start();
  }

  componentDidMount() {
    this.slideIn();
  }

  render() {
    return (
      <Template
        translateY={this.translateY}
        opacity={this.opacity}
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
