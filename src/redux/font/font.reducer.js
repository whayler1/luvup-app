import { SET_IS_FONT_LOADED } from './font.actions';

const defaultState = {
  isFontLoaded: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IS_FONT_LOADED:
      return {
        isFontLoaded: action.isFontLoaded,
      };
    default:
      return state;
  }
}
