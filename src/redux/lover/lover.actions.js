import config from '../../config';

export const SET_LOVER = 'lover/set-lover';
export const CLEAR_LOVER = 'lover/clear-lover';

export const setLover = (id, username, firstName, lastName) => ({
  type: SET_LOVER,
  id,
  username,
  firstName,
  lastName,
});

export const clearLover = () => ({
  type: CLEAR_LOVER,
});
