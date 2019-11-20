import { Actions } from 'react-native-router-flux';

import { default as store } from '../redux';
import { getMe } from '../redux/user/user.actions';
import { getCoinCount } from '../redux/coin/coin.actions';
import { getJalapenoCount } from '../redux/jalapeno/jalapeno.actions';
import analytics from '../services/analytics';

const indentifyUser = user =>
  analytics.identify({
    userId: user.id,
    traits: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
  });

const userLoginRouteSwitch = async () => {
  const res = await store.dispatch(getMe());

  const state = store.getState();
  const user = state.user;

  if (!('body' in res)) {
    Actions.reset('login');
  } else {
    await Promise.all([
      store.dispatch(getCoinCount()),
      store.dispatch(getJalapenoCount()),
    ]);
    Actions.reset('dashboard');
    indentifyUser(user);
  }
};

export default userLoginRouteSwitch;
