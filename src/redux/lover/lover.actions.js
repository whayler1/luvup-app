export const SET_LOVER = 'lover/set-lover';

export const setLover = (
  id,
  email,
  username,
  firstName,
  lastName,
  isPlaceholder
) => ({
  type: SET_LOVER,
  id,
  email,
  username,
  firstName,
  lastName,
  isPlaceholder,
});
