export const SET_STABLE_STATE = "SET_STABLE_STATE";

export const setStableState = (Boolean) => {
  return (dispatch) => {
    return dispatch({
      type: SET_STABLE_STATE,
      payload: Boolean,
    });
  };
};
