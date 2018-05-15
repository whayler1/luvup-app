import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Animated,
  Easing,
} from 'react-native';
import Template from './InAppNotifications.template';
import { clearNotifications as clearNotificationsAction } from '../../redux/notifications/notifications.actions';
import _ from 'lodash';

class InAppNotifications extends PureComponent {
  state = {
    isVisible: false,
  };

  static propTypes = {
    // isFontLoaded: PropTypes.boolean.isRequired,
    notifications: PropTypes.array.isRequired,
    jalapenoNotifications: PropTypes.array.isRequired,
    luvupNotifications: PropTypes.array.isRequired,
    clearNotifications: PropTypes.func.isRequired,
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

  close = () => this.setState({
    isVisible: false,
  }, () => {
    this.translateY.setValue(-150);
    this.opacity.setValue(0);
    this.props.clearNotifications();
    Actions.pop();
  });

  closeDebounce = _.debounce(() => this.setState({
    isVisible: false,
  }, () => {
    this.close();
  }), 7000);

  show = () => this.setState({
    isVisible: true,
  }, () => {
    this.slideIn();
    this.closeDebounce();
  });

  componentDidMount() {
    if (this.props.notifications.length) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notifications.length !== this.props.notifications.length) {
      if (this.props.notifications.length > 0 && !this.state.isVisible) {
        this.show();
      } else if (this.props.notifications.length > 0 && this.state.isVisible) {
        this.closeDebounce();
      } else if (this.props.notifications.length < 1 && this.state.isVisible) {
        this.close();
      }
    }
  }

  render() {
    return (
      <Template
        translateY={this.translateY}
        opacity={this.opacity}
        close={this.close}
        jalapenoNotifications={this.props.jalapenoNotifications}
        luvupNotifications={this.props.luvupNotifications}
      />
    )
  }
};

export default connect(
  state => ({
    isFontLoaded: state.font.isFontLoaded,
    ...state.notifications,
  }),
  {
    clearNotifications: clearNotificationsAction,
  }
)(InAppNotifications);
