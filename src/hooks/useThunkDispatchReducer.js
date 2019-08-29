import { useCallback, useReducer } from 'react';

const useThunkDispatchReducer = (reducer, initialState, initializer) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const thunkDispatch = useCallback(
    action => {
      if (typeof action.then === 'function') {
        return action.then(dispatch);
      }
      return Promise.resolve(dispatch(action));
    },
    [dispatch]
  );
  return [state, thunkDispatch];
};

export default useThunkDispatchReducer;
