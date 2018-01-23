import config from '../../config';

const SET_LOVER = 'lover/set-lover';

export const setLover = (
  id,
  username,
  firstName,
  lastName,
) => ({
  type: SET_LOVER,
  id,
  username,
  firstName,
  lastName,
});
