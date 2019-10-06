import get from 'lodash/get';

const getGraphQlError = res => get(res, 'body.errors[0].message');

export default getGraphQlError;
