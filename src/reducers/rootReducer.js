// Internal
import initialState from '../store/initialState';
import geodataReducer from './geodataReducer';
import audioReducer from './audioReducer';

// The root reducer
export default (state = initialState, action) => ({
  // Apply app reducers in order
  ...state,
  geodata: geodataReducer(state, action),
  audio: audioReducer(state, action),
});
