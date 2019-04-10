import relationshipApi from './relationship.api';
import { clearLover } from '../lover/lover.actions';

export const SET_RELATIONSHIP = 'relationship/set-relationship';
export const END_RELATIONSHIP = 'relationship/end-relationship';
export const CLEAR_RELATIONSHIP = 'relationship/clear-relationship';

export const setRelationship = (id, createdAt) => dispatch => {
  dispatch({ type: SET_RELATIONSHIP, id, createdAt });
};

export const endRelationship = () => async dispatch => {
  try {
    const res = await relationshipApi.endRelationship();

    dispatch({ type: END_RELATIONSHIP });
    dispatch(clearLover());

    return res;
  } catch (err) {
    return err;
  }
};

export const clearRelationship = () => ({ type: CLEAR_RELATIONSHIP });
