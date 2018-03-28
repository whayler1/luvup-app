import Analytics from 'analytics-react-native';
import config from '../config';

const analytics = new Analytics(config.segmentWriteKey);

export default analytics;
