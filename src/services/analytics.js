import Analytics from 'analytics-react-native';
import config from '../config';

const { segmentWriteKey } = config;

const warnFunc = () =>
  console.warn(
    'analytics calls will not be made because of missing segment write key'
  );

const analytics = segmentWriteKey
  ? new Analytics(segmentWriteKey)
  : {
      track: warnFunc,
      screen: warnFunc,
      identify: warnFunc,
    };

if (!segmentWriteKey) {
  warnFunc();
}

export default analytics;
