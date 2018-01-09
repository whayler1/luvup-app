export const SET_USER = 'user/set-user';

export const setUser = (id, email, username) => ({
  type: SET_USER,
  id,
  email,
  username
});
