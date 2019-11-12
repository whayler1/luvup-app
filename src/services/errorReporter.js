import isObject from 'lodash/isObject';
import Constants from 'expo-constants';
import * as SentryExpo from 'sentry-expo';

SentryExpo.init({
  dsn: 'https://4a28a8d815ee4fe7b00e046eaf6ca125@sentry.io/1816836',
  enableInExpoDevelopment: true,
  debug: true,
});

SentryExpo.setRelease(Constants.manifest.revisionId);

export const Sentry = SentryExpo;

const reportWithMethod = (method, error, options) => {
  if (!isObject(options)) {
    SentryExpo[method](error);
    return;
  }

  SentryExpo.withScope(scope => {
    if (options.user) {
      scope.setUser(options.user);
    }
    if (options.tags) {
      Object.entries(options.tags).forEach(([name, value]) => {
        scope.setTag(name, value);
      });
    }
    if (options.level) {
      scope.setLevel(options.level);
    }
    if (options.extra) {
      Object.entries(options.extra).forEach(([name, value]) => {
        scope.setExtra(name, value);
      });
    }
    SentryExpo[method](error);
  });
};

const exception = (error, options) =>
  reportWithMethod('captureException', error, options);

const message = (error, options) =>
  reportWithMethod('captureMessage', error, options);

export default { exception, message };
