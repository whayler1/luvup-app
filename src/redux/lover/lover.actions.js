export const SET_LOVER = 'lover/set-lover';
export const CLEAR_LOVER = 'lover/clear-lover';

export const setLover = (id, username, firstName, lastName, isPlaceholder) => ({
  type: SET_LOVER,
  id,
  username,
  firstName,
  lastName,
  isPlaceholder,
});

export const clearLover = () => ({
  type: CLEAR_LOVER,
});
