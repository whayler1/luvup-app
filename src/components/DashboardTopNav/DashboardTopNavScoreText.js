import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import isNumber from 'lodash/isNumber';

import styles from './DashboardTopNav.styles';

/* eslint-disable-next-line no-empty-function */
const defaultFunc = () => {};

class DashboardTopNavScoreText extends PureComponent {
  static propTypes = {
    relationshipScore: PropTypes.number,
    onScoreAnimationStart: PropTypes.func,
    onScoreAnimationEnd: PropTypes.func,
  };

  static defaultProps = {
    onScoreAnimationStart: defaultFunc,
    onScoreAnimationEnd: defaultFunc,
  };

  constructor(props) {
    super(props);

    this.state = {
      relationshipScoreDisplay: props.relationshipScore,
      isAnimating: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.relationshipScore !== this.props.relationshipScore) {
      this.relationshipScoreDisplayTick();
    }
    if (prevState.isAnimating !== this.state.isAnimating) {
      const {
        props: { onScoreAnimationStart, onScoreAnimationEnd },
      } = this;
      const isScoreRising =
        prevState.relationshipScoreDisplay <
        this.state.relationshipScoreDisplay;
      if (this.state.isAnimating) {
        onScoreAnimationStart({ isScoreRising });
      } else {
        onScoreAnimationEnd();
      }
    }
  }

  relationshipScoreDisplayTick = () => {
    clearTimeout(this.timeout);
    const {
      props: { relationshipScore },
      state: { relationshipScoreDisplay },
    } = this;
    if (relationshipScore !== relationshipScoreDisplay) {
      if (isNumber(relationshipScore) && isNumber(relationshipScoreDisplay)) {
        this.timeout = setTimeout(() => {
          this.relationshipScoreDisplayTick();
        }, 150);
        this.setState(state => {
          const isScoreHigher =
            relationshipScore > state.relationshipScoreDisplay;
          return {
            relationshipScoreDisplay: isScoreHigher
              ? state.relationshipScoreDisplay + 1
              : state.relationshipScoreDisplay - 1,
            isAnimating: true,
          };
        });
      } else {
        this.setState({
          relationshipScoreDisplay: relationshipScore,
          isAnimating: false,
        });
      }
    } else {
      this.setState({ isAnimating: false });
    }
  };

  render() {
    return (
      <Text style={styles.scoreText}>
        {this.state.relationshipScoreDisplay}%
      </Text>
    );
  }
}

export default DashboardTopNavScoreText;
