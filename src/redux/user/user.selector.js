/* eslint-disable import/prefer-default-export */

export const getInititals = (state) =>
  `${state.user.firstName
    .substr(0, 1)
    .toUpperCase()}${state.user.lastName.substr(0, 1).toUpperCase()}`;
