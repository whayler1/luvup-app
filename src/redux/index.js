import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user/user.reducer';
import relationship from './relationship/relationship.reducer';
import lover from './lover/lover.reducer';
import loverRequest from './loverRequest/loverRequest.reducer';
import coin from './coin/coin.reducer';
import jalapeno from './jalapeno/jalapeno.reducer';

export const reducer = combineReducers({
  user,
  relationship,
  lover,
  loverRequest,
  coin,
  jalapeno,
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
